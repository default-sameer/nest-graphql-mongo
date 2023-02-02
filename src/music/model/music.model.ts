import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/model/user.model';

@ObjectType('Music')
@Schema()
export class Music {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  artist: string;

  @Field(() => String)
  @Prop()
  album: string;

  @Field(() => Number)
  @Prop()
  year: number;

  // Create a relationship between the Music and User models
  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export type MusicDocument = Music & Document;

export const MusicSchema = SchemaFactory.createForClass(Music);
