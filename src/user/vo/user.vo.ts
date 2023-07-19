import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: '注册成功' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
