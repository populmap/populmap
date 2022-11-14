import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity('auth.site')
export default class AuthSite {
  @PrimaryGeneratedColumn({
    name: 'siteId',
  })
  site_id: number;

  @Column({
    name: 'site_user_id',
    unique: true,
    type: 'int',
  })
  siteUserId: number;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 32,
  })
  password: string;

  @CreateDateColumn({
    name: 'first_login',
  })
  firstLogin: Date;

  @CreateDateColumn({
    name: 'last_login',
  })
  lastLogin: Date;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
