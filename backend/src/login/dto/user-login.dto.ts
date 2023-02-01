import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Registered name of the user',
    example: 'desafiosharenergy',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Registered password of the user',
    example: 'sh@r3n3rgy',
  })
  password: string;
}
