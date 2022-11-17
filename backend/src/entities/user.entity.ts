import LoginType from 'src/enums/login.type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
