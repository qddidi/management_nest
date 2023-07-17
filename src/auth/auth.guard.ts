import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      //即将调用的方法
      context.getHandler(),
      //controller类型
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new ApiException('验证不通过', ApiErrorCode.FORBIDDEN);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new ApiException(
        '登录状态已过期,请重新登录',
        ApiErrorCode.LOGIN_EXPIRE,
      );
    }

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers);

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
