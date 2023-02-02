import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMusicDto, UpdateMusicDto } from '../dto/music.dto';
import { Schema as MongooseSchema } from 'mongoose';
import { MusicService } from '../service/music.service';
import { Music } from '../model/music.model';
import { UserService } from 'src/user/service/user.service';

@Resolver(() => Music)
export class MusicResolver {
  constructor(
    private musicService: MusicService,
    private userService: UserService,
  ) {}

  @Query(() => Music)
  async music(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    const music = await this.musicService.findOne(_id);
    if (!music) {
      throw new Error(`Music with id ${_id} not found`);
    }
    return music;
  }

  @Query(() => [Music])
  async musics(@Args('limit', { type: () => Number }) limit: number) {
    const musics = await this.musicService.findAll({ limit });
    if (musics.length === 0) {
      throw new Error(`No music found`);
    }
    return musics;
  }

  @Mutation(() => Music)
  async createMusic(@Args('createMusic') createMusicInput: CreateMusicDto) {
    return this.musicService.create(createMusicInput);
  }

  @Mutation(() => Music)
  async updateMusic(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
    @Args('updateMusic') updateMusicInput: UpdateMusicDto,
  ) {
    const ifMusic = await this.musicService.findOne(_id);
    if (!ifMusic) {
      throw new Error(`Music with id ${_id} not found`);
    }
    return this.musicService.update(_id, updateMusicInput);
  }

  @Mutation(() => Music)
  async removeMusic(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    const ifMusic = await this.musicService.findOne(_id);
    if (!ifMusic) {
      throw new Error(`Music with id ${_id} not found`);
    }
    return this.musicService.remove(_id);
  }

  @Query(() => [Music])
  async userMusics(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
    // @Args('limit', { type: () => Number }) limit: number,
  ) {
    if (!_id) throw new Error('No id provided');
    const ifUser = await this.userService.findOne(_id);
    if (!ifUser) {
      throw new Error(`User with id ${_id} not found`);
    }
    return this.musicService.listMusicByUser(_id);
  }
}
