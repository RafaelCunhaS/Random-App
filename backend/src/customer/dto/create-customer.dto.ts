import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the customer',
    example: 'John Doe',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the customer',
    example: 'john_doe@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Phone number of the customer',
    example: '98462-1234',
  })
  phonenumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Main address of the customer',
    example: 'Salvador, BA',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'CPF of the customer',
    example: '123.456.789-11',
  })
  cpf: string;
}
