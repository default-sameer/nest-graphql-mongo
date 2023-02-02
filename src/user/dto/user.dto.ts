import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsEmail } from 'class-validator';
import { Music } from 'src/music/model/music.model';

@InputType()
export class LoginUserDto {
  @MinLength(5)
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(10)
  @Field(() => String)
  password: string;
}

@InputType()
export class CreateUserDto {
  @MinLength(5)
  @Field(() => String)
  name: string;

  @MinLength(5)
  @Field(() => String)
  username: string;

  @MinLength(5)
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(10)
  @Field(() => String)
  password: string;
}

@InputType()
export class UserDto {
  _id: MongooseSchema.Types.ObjectId;
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [Music])
  music?: Music[];
}

export class listUserMusicDto {
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  username: string;

  @Field(() => [Music])
  music?: Music[];
}

export class userMusicDto {
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  limit: number;
}

@InputType()
export class UpdateUserDto {
  _id: MongooseSchema.Types.ObjectId;
  @MinLength(5)
  @Field(() => String)
  name: string;

  @MinLength(5)
  @Field(() => String)
  username: string;

  @MinLength(5)
  @Field(() => String)
  email: string;

  @MinLength(10)
  @Field(() => String)
  password: string;
}
