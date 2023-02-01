import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UserLoginDto } from 'src/login/dto';
import { CreateCustomerDto, EditCustomerDto } from 'src/customer/dto';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from '../src/database/database.service';

describe('App e2e tests', () => {
  let app: INestApplication;
  let dbConnection: DatabaseService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27018/sharenergy'),
        AppModule,
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    dbConnection = app.get(DatabaseService);
    dbConnection.getDbHandle();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await dbConnection.cleanDb();
    app.close();
  });

  describe('Login', () => {
    const invalidDto: UserLoginDto = {
      username: 'invalidUser',
      password: '123321',
    };
    const dto: UserLoginDto = {
      username: 'desafiosharenergy',
      password: 'sh@r3n3rgy',
    };
    it('should throw if the username is empty', () => {
      return pactum
        .spec()
        .post('/login')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
    });
    it('should throw if the password is empty', () => {
      return pactum
        .spec()
        .post('/login')
        .withBody({
          email: dto.username,
        })
        .expectStatus(400);
    });
    it('should throw if no body provided', () => {
      return pactum.spec().post('/login').expectStatus(400);
    });
    it('should throw if wrong credentials are provided', () => {
      return pactum
        .spec()
        .post('/login')
        .withBody(invalidDto)
        .expectStatus(403);
    });
    it('should login with the correct credentials', () => {
      return pactum.spec().post('/login').withBody(dto).expectStatus(200);
    });
  });

  describe('Customers', () => {
    describe('Get all empty', () => {
      it('should get an empty array', () => {
        return pactum.spec().get('/customers').expectStatus(200).expectBody([]);
      });
    });

    describe('Create customer', () => {
      const dto: CreateCustomerDto = {
        username: 'First customer',
        email: 'first@gmail.com',
        phonenumber: '91234-5432',
        address: 'Empty street',
        cpf: '123.456.789-11',
      };
      it('should create a new customer', () => {
        return pactum
          .spec()
          .post('/customers')
          .withBody(dto)
          .expectStatus(201)
          .stores('customerId', '_id');
      });
    });

    describe('Get all with customers', () => {
      it('should get one customer', () => {
        return pactum
          .spec()
          .get('/customers')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get customer by id', () => {
      it('should get customer by id', () => {
        return pactum
          .spec()
          .get('/customers/{id}')
          .withPathParams('id', '$S{customerId}')
          .expectStatus(200)
          .expectBodyContains('$S{customerId}');
      });
    });

    describe('Edit customer by id', () => {
      const dto: EditCustomerDto = {
        username: 'Edited customer',
        email: 'edited@gmail.com',
      };
      it('should return edited customer', () => {
        return pactum
          .spec()
          .patch('/customers/{id}')
          .withPathParams('id', '$S{customerId}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.username)
          .expectBodyContains(dto.email);
      });
    });

    describe('Delete customer by id', () => {
      it('should delete customer', () => {
        return pactum
          .spec()
          .delete('/customers/{id}')
          .withPathParams('id', '$S{customerId}')
          .expectStatus(204);
      });

      it('should get empty customers', () => {
        return pactum
          .spec()
          .get('/customers')
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
