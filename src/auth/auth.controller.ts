import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/public/public.decorator';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LoginResponse } from './vo/auth.vo';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('登录验证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: '登录接口', // 接口描述信息
  })
  @ApiOkResponse({ description: '登录成功返回', type: LoginResponse })
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @ApiBearerAuth()
  @Post('test')
  test() {
    return 1;
  }
}
