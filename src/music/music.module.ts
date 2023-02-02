import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema, Music } from './model/music.model';
import { MusicService } from './service/music.service';
import { MusicResolver } from './resolver/music.resolver';
import { User, UserSchema } from 'src/user/model/user.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  exports: [MusicService],
  providers: [MusicService, MusicResolver],
})
export class MusicModule {}
