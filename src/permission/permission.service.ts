import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const name = createPermissionDto.name;
    const existPermission = await this.permissionRepository.findOne({
      where: { name },
    });

    if (existPermission)
      throw new ApiException('权限字段已存在', ApiErrorCode.PERMISSSION_EXIST);
    return await this.permissionRepository.save(createPermissionDto);
  }
}
