import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;
  //菜单名称
  @Column({
    length: 20,
  })
  name: string;
  //排序
  @Column()
  orderNum: number;
  //父id
  @Column({ nullable: true })
  parentId: number;
  @Column({
    length: 10,
  })
  menuType: string;
  //菜单图标

  @Column({
    length: 50,
    nullable: true,
  })
  icon: string;

  //组件路径
  @Column({
    length: 50,
  })
  component: string;

  //路由
  @Column({
    length: 50,
  })
  path: string;

  @Column({
    length: 50,
    nullable: true,
  })
  createBy: string;
  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
