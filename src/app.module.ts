import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicModule } from './music/music.module';
import { UserModule } from './user/user.module';
import { ValidateUserMiddleware } from './user/middleware/validate-user.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './user/filters/exception.filters';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      // buildSchemaOptions: {
      //   fieldMiddleware: [ValidateUserMiddleware],
      // },
    }),
    MongooseModule.forRoot('mongodb://localhost/nest-graphql', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MusicModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
