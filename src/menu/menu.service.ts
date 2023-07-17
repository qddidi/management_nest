import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { convertToTree } from 'src/utils/convertToTree';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      await this.menuRepository.save(createMenuDto);
    } catch (error) {
      throw new ApiException(error, ApiErrorCode.DATABASE_ERROR);
    }
    return '操作成功';
  }

  async findMenu(user) {
    const userList: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where({ username: user.username })
      .orderBy('menu.orderNum', 'ASC')
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
