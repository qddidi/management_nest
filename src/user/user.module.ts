/*
 * @Description:
 * @Date: 2023-05-11 10:32:05
 * @Author: didi
 * @LastEditTime: 2023-05-11 11:59:26
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
