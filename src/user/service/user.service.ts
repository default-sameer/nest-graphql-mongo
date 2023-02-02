import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto';
import { passwordCompare, passwordHash } from '../hashing/password.hash';
import { User, UserDocument } from '../model/user.model';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // Inject multiple model schemas into the constructor
  // constructor(
  //   @InjectModel(User.name) private userModel: Model<UserDocument>,
  //   @InjectModel(Music.name) private musicModel: Model<UserDocument>,
  // ) {}

  // async login(email: string, password: string): Promise<User> {
  //   const user = await this.userModel.findOne({ email });
  //   if (!user) {
  //     throw new Error('Email not found');
  //   }
  //   const checkPassword = await passwordCompare(password, user.password);
  //   if (!checkPassword) {
  //     throw new Error('Password is incorrect');
  //   }
  //   return user;
  // }

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await passwordHash(user.password);

    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll({ limit }): Promise<UserDto[]> {
    return this.userModel.find().limit(limit).exec();
  }

  async findOne(id: MongooseSchema.Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const ifEmail = await this.userModel.findOne({ email });
    if (!ifEmail) {
      return null;
    }
    return ifEmail;
  }

  async findByUsername(username: string): Promise<User> {
    const ifUsername = await this.userModel.findOne({ username });
    if (!ifUsername) {
      return null;
    }
    return ifUsername;
  }

  async update(
    id: MongooseSchema.Types.ObjectId,
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  async remove(id: MongooseSchema.Types.ObjectId): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
