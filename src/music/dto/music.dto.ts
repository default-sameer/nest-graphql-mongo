import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMusicDto {
  @MinLength(3)
  @Field(() => String)
  title: string;

  @MinLength(1)
  @Field(() => String)
  artist: string;

  @MinLength(1)
  @Field(() => String)
  album: string;

  @IsNotEmpty()
  @Field(() => Number)
  year: number;

  @IsNotEmpty()
  @Field(() => String)
  user: MongooseSchema.Types.ObjectId;
}

@InputType()
export class MusicDto {
  _id: MongooseSchema.Types.ObjectId;
  @Field(() => String)
  title: string;

  @Field(() => String)
  artist: string;

  @Field(() => String)
  album: string;

  @Field(() => Number)
  year: number;
}

@InputType()
export class UpdateMusicDto {
  _id: MongooseSchema.Types.ObjectId;
  @MinLength(1)
  @Field(() => String)
  title: string;

  @MinLength(1)
  @Field(() => String)
  artist: string;

  @MinLength(1)
  @Field(() => String)
  album: string;

  @IsNotEmpty()
  @Field(() => Number)
  year: number;
}
