import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CustomerModule,
    LoginModule,
  ],
})
export class AppModule {}
