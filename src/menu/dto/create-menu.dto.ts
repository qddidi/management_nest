import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMenuDto {
  @IsNotEmpty({ message: '菜单名不可为空' })
  @ApiProperty({
    example: '菜单1',
  })
  name: string;
  @ApiProperty({
    example: 1,
  })
  orderNum: number;
  @ApiProperty({
    example: 1,
  })
  parentId: number;
  @ApiProperty({
    example: 'M',
  })
  menuType: string;
  @ApiProperty({
    example: 'menu',
  })
  icon: string;
  @IsNotEmpty({ message: '组件路径不可为空' })
  @ApiProperty({
    example: 'AA/BB',
  })
  component: string;
  @IsNotEmpty({ message: '路由不可为空' })
  @ApiProperty({
    example: 'BB',
  })
  path: string;
  @ApiProperty({
    example: 'Admin',
  })
  createBy: string;
}
