import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserLoginDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() dto: UserLoginDto) {
    return this.loginService.login(dto);
  }
}
