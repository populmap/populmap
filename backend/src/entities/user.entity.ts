import LoginType from 'src/enums/login.type.enum';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AuthSite from './auth.site.entity';
import AuthSocial from './auth.social.entity';
import Bookmark from './bookmark.entity';

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

  @OneToOne(() => AuthSite, (authSite) => authSite.user)
  authSite: AuthSite | null;

  @OneToOne(() => AuthSocial, (authSocial) => authSocial.user)
  authSocial: AuthSocial | null;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[] | null;
}
