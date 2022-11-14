import LoginType from "src/enums/login.type.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AuthSocial from "./auth.social.entity";

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  userId: number;

  @Column({
    name: 'user_name',
    unique: true,
    type: 'varchar',
    length: 64,
  })
  userName: string;

  @Column({
    name: 'email',
    unique: true,
    type: 'varchar',
    length: 64,
  })
  email: string;

  @Column({
    name: 'login_type',
    type: 'enum',
    enum: LoginType,
  })
  loginType: LoginType;
}
