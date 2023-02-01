import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto';

@Injectable()
export class LoginService {
  login(dto: UserLoginDto) {
    if (dto.username != 'johndoe' || dto.password != '123456') {
      throw new ForbiddenException('Incorrect username or password');
    }
    return;
  }
}
