import { ApiProperty } from '@nestjs/swagger';

const menuListTree = {
  id: 1,
  menuName: '父菜单1',
  orderNum: 1,
  parentId: null,
  menuType: 'M',
  icon: 'menu',
  component: 'aa/dd',
  path: 'aa',
  createBy: null,
  createTime: '2023-07-13T10:17:40.695Z',
  updateTime: '2023-07-14T05:48:51.613Z',
  children: {
    id: 2,
    menuName: '子菜单1',
    orderNum: 1,
    parentId: null,
    menuType: 'M',
    icon: 'menu',
    component: 'aa/cc',
    path: 'bb',
    createBy: null,
    createTime: '2023-07-13T10:17:40.695Z',
    updateTime: '2023-07-14T05:48:51.613Z',
    children: [],
  },
};

export class MenuResponse {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: menuListTree })
  data: any;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
