import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserAlreadyExistException } from 'src/user/exception/AlreadyExist.exception';
import { UserNotFoundException } from 'src/user/exception/UserNotFound.exception';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/service/user.service';
import { LoginUserDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => User)
  async login(@Args('login') login: LoginUserDto) {
    const ifEmail = await this.userService.findByEmail(login.email);
    if (!ifEmail) {
      throw new UserNotFoundException(`Email ${login.email} not found`);
    }
    const user = await this.authService.validateUser(
      login.email,
      login.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  @Mutation(() => User)
  async register(@Args('create') create: CreateUserDto) {
    const ifEmail = await this.userService.findByEmail(create.email);
    const ifUsername = await this.userService.findByUsername(create.username);

    if (ifEmail) {
      throw new UserAlreadyExistException(
        `User with email ${create.email} already exists`,
      );
    }
    if (ifUsername) {
      throw new UserAlreadyExistException(
        `User with username ${create.username} already exists`,
      );
    }
    return this.userService.create(create);
  }
}
