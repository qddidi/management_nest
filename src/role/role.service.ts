import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    //查询传入数组permissionIds的全部permission实体
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.permissionIds),
      },
    });
    const name = createRoleDto.name;
    const existRole = await this.roleRepository.findOne({
      where: { name },
    });

    if (existRole)
      throw new ApiException('角色已存在', ApiErrorCode.ROLE_EXIST);
    return this.roleRepository.save({ permissions, name });
  }
}
