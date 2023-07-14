import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { convertToTree } from 'src/utils/convertToTree';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.save(createMenuDto);
  }

  async findMenu(user) {
    const userList: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where({ username: user.username })
      .orderBy('menu.orderNum', 'DESC')
      .getOne();

    interface MenuMap {
      [key: string]: Menu;
    }

    const menus: MenuMap = userList?.roles.reduce(
      (mergedMenus: MenuMap, role: any) => {
        role.menus.forEach((menu: Menu) => {
          mergedMenus[menu.id] = menu;
        });
        return mergedMenus;
      },
      {},
    );

    // 去重后的菜单数组
    const uniqueMenus: Menu[] = Object.values(menus);

    return convertToTree(uniqueMenus);
  }
}
