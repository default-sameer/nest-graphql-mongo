import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsEmail } from 'class-validator';

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
