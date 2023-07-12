import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import encry from '../utils/crypto';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;

    const user = await this.userService.findOne(username);
    if (user?.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.PASSWORD_ERROR);
    }
    const payload = { username: user.username, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
