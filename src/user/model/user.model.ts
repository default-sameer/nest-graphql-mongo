import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Music } from 'src/music/model/music.model';

@ObjectType('User')
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => [Music])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Music' }] })
  music: Music[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
