import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { Menu } from '../menu/entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role, Permission, Menu])],
})
export class RoleModule {}
