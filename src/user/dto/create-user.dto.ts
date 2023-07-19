import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @Length(2, 10, {
    message: '用户名长度必须为2-10之间',
  })
  username: string;
  @ApiProperty({
    example: 'admin',
    description: '密码',
  })
  @IsNotEmpty()
  @Length(5, 15, {
    message: '密码长度必须为5-15之间',
  })
  password: string;
  @ApiProperty({
    example: [1, 2, 3],
    description: '角色id',
  })
  roleIds: number[];
}
