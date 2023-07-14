import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, In, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, roleIds } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    console.log(existUser);

    if (existUser)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    try {
      //查询数组roleIds对应所有role的实例
      const roles = await this.roleRepository.find({
        where: {
          id: In(roleIds),
        },
      });
      const newUser = await this.userRepository.create({
        username,
        password,
        roles,
      });
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user)
      throw new ApiException('用户名不存在', ApiErrorCode.USER_NOTEXIST);
    return user;
  }

  test(testParams) {
    return testParams;
  }

  async findPermissionNames(token: string, userInfo) {
    const user = await this.userRepository.findOne({
      where: { username: userInfo.username },
      relations: ['roles', 'roles.permissions'],
    });
    if (user) {
      const permissions = user.roles.flatMap((role) => role.permissions);
      const permissionNames = permissions.map((item) => item.name);

      return [...new Set(permissionNames)];
    } else {
      return [];
    }
  }
}
