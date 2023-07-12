import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role, Permission])],
})
export class RoleModule {}
