import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserDto } from '../dto/user.dto';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Schema as MongooseSchema } from 'mongoose';
import { UserNotFoundException } from '../exception/UserNotFound.exception';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/guard/auth.guard';

@Resolver(() => User)
@UseGuards(new GraphqlAuthGuard('local'))
// @UseGuards(GraphqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}
  // multiple constructor arguments
  // constructor(
  //   private userService: UserService,
  //   private musicService: MusicService,
  // ) {}

  // @Query(() => User)
  // async login(@Args('login') login: LoginUserDto) {
  //   const ifEmail = await this.userService.findByEmail(login.email);
  //   if (!ifEmail) {
  //     throw new UserNotFoundException(`Email ${login.email} not found`);
  //   }
  //   const user = await this.userService.login(login.email, login.password);
  //   if (!user) {
  //     throw new Error('Invalid credentials');
  //   }
  //   return user;
  // }

  // @Mutation(() => User)
  // async createUser(@Args('createUser') createUserInput: CreateUserDto) {
  //   const ifEmail = await this.userService.findByEmail(createUserInput.email);
  //   const ifUsername = await this.userService.findByUsername(
  //     createUserInput.username,
  //   );

  //   if (ifEmail) {
  //     throw new UserAlreadyExistException(
  //       `User with email ${createUserInput.email} already exists`,
  //     );
  //   }
  //   if (ifUsername) {
  //     throw new UserAlreadyExistException(
  //       `User with username ${createUserInput.username} already exists`,
  //     );
  //   }
  //   return this.userService.create(createUserInput);
  // }

  @Query(() => [User])
  async users(@Args('limit', { type: () => Number }) limit: number) {
    const users = await this.userService.findAll({ limit });
    if (users.length === 0) {
      throw new UserNotFoundException('No User Found');
    }
    return users;
  }

  @Query(() => User)
  async user(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    const user = await this.userService.findOne(_id);
    if (!user) {
      throw new UserNotFoundException(`User with id ${_id} not found`);
    }
    return user;
  }

  @Query(() => User)
  async username(@Args('username', { type: () => String }) username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UserNotFoundException(
        `User with username ${username} not found`,
      );
    }
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
    @Args('updateUser') updateUserInput: UpdateUserDto,
  ) {
    const ifUser = await this.userService.findOne(_id);
    if (!ifUser) {
      throw new UserNotFoundException(`User with id ${_id} not found`);
    }
    return this.userService.update(_id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    if (!_id) throw new Error('No id provided');
    const ifUser = await this.userService.findOne(_id);
    if (!ifUser) {
      throw new UserNotFoundException(`User with id ${_id} not found`);
    }
    return this.userService.remove(_id);
  }
}
