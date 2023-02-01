import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class EditCustomerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name of the customer',
    example: 'John Doe2',
    required: false,
  })
  username?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Email of the customer',
    example: 'john_doe2@gmail.com',
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Phone number of the customer',
    example: '98462-1234',
    required: false,
  })
  phonenumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Main address of the customer',
    example: 'Belo Horizonte, MG',
    required: false,
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'CPF of the customer',
    example: '123.456.789-11',
    required: false,
  })
  cpf?: string;
}
