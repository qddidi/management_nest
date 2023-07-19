import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public, Permissions } from 'src/public/public.decorator';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserResponse } from './vo/user.vo';
@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @ApiOperation({
    summary: '注册接口', // 接口描述信息
  })
  @Post('register')
  @ApiOkResponse({
    type: CreateUserResponse,
    description: '创建用户返回结果',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('test')
  @Permissions('read')
  test(@Body() testParams) {
    return this.userService.test(testParams);
  }
}
