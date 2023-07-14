import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { Menu } from 'src/menu/entities/menu.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const name = createRoleDto.name;
    const existRole = await this.roleRepository.findOne({
      where: { name },
    });

    if (existRole)
      throw new ApiException('角色已存在', ApiErrorCode.ROLE_EXIST);

    //查询传入数组permissionIds的全部permission实体
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.permissionIds),
      },
    });

    //查询传入数组menuIds的全部menu实体
    const menus = await this.menuRepository.find({
      where: {
        id: In(createRoleDto.menuIds),
      },
      relations: ['roles'],
    });
    return this.roleRepository.save({ permissions, name, menus });
  }
}
