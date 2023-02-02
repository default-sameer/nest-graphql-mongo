import { Injectable } from '@nestjs/common';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/service/user.service';
import { passwordCompare } from 'src/user/hashing/password.hash';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    // if (!user) {
    //   throw new Error('Email not found');
    // }
    const checkPassword = await passwordCompare(password, user.password);
    if (!checkPassword) {
      throw new Error('Password is incorrect');
    }
    return user;
  }
}
