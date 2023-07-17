/*
 * @Description:
 * @Date: 2023-05-11 09:54:37
 * @Author: didi
 * @LastEditTime: 2023-05-12 18:01:22
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './upload/upload.module';
import { resolve, join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { JwtModule } from '@nestjs/jwt';
import { MenuModule } from './menu/menu.module';

const isProd = process.env.NODE_ENV == 'production';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [isProd ? resolve('.env.prod') : resolve('.env')],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT), // 端口号
      username: process.env.DB_USER, // 用户名
      password: process.env.DB_PASSWD, // 密码
      autoLoadEntities: true, //自动加载实体
      synchronize: true, //是否自动同步实体文件,生产环境建议关闭
      database: process.env.DB_DATABASE, //数据库名
    }),
    UserModule,
    UploadModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
