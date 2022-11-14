import SocialType from "src/enums/social.type.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity('auth.social')
export default class AuthSocial {
  @PrimaryGeneratedColumn({
    name: 'social_id',
  })
  socialId: number;

  @Column({
    name: 'social_user_id',
    unique: true,
    type: 'int',
  })
  socialUserId: number;

  @Column({
    name: 'social_type',
    type: 'enum',
    enum: SocialType,
  })
  socialType: SocialType;

  @Column({
    name: 'access_token',
    unique: true,
    type: 'varchar',
    length: 256,
  })
  accessToken: string;

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
