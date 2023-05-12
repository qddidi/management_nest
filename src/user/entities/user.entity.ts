/*
 * @Description:
 * @Date: 2023-05-11 10:32:05
 * @Author: didi
 * @LastEditTime: 2023-05-11 13:38:44
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记为主键，值自动生成

  @Column({ length: 30 })
  username: string; //用户名
  @Column()
  password: string; //密码
}
