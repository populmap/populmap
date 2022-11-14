import { IAuthRepository } from "./auth.repository.interface";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";


// export class AuthRepository implements IAuthRepository {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>,
//   ) {}

// }
