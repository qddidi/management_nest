/*
 * @Description:
 * @Date: 2023-05-11 10:32:05
 * @Author: didi
 * @LastEditTime: 2023-05-12 10:49:58
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('award')
export class Award {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记为主键，值自动生成

  @Column({ length: 30 })
  awardname: string; //奖品名称
  @Column({ length: 30 })
  popurl: string; //奖品连接
  @Column({ length: 30 })
  gift_id: string; //奖品id
}
