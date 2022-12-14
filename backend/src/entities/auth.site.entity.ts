import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('auth_site')
export default class AuthSite {
  @PrimaryGeneratedColumn({
    name: 'site_id',
  })
  siteId: number;

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

  @Column({
    name: 'is_temporary',
    type: 'boolean',
    default: false,
  })
  isTemporary: boolean;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'site_user_id',
  })
  user: User;
}
