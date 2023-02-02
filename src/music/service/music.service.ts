import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Music, MusicDocument } from '../model/music.model';
import { CreateMusicDto, UpdateMusicDto } from '../dto/music.dto';
import { User, UserDocument } from 'src/user/model/user.model';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const createdMusic = new this.musicModel(createMusicDto);
    return createdMusic.save();
  }

  async findAll({ limit }): Promise<Music[]> {
    return this.musicModel.find().limit(limit).exec();
  }

  async findOne(id: MongooseSchema.Types.ObjectId): Promise<Music> {
    const music = await this.musicModel.findById(id);
    return music;
    // if (!music) {
    //   throw new Error(`Music with ${id} not found`);
    // }
    // return this.musicModel.findById(id).exec();
  }

  async update(
    id: MongooseSchema.Types.ObjectId,
    updateMusicDto: UpdateMusicDto,
  ): Promise<Music> {
    return this.musicModel
      .findByIdAndUpdate(id, updateMusicDto, { new: true })
      .exec();
  }

  async remove(id: MongooseSchema.Types.ObjectId): Promise<Music> {
    return this.musicModel.findByIdAndRemove(id).exec();
  }

  async listMusicByUser(
    userId: MongooseSchema.Types.ObjectId,
  ): Promise<Music[]> {
    const music = await this.musicModel.find({ user: userId }).exec();
    if (!music) {
      return null;
    }
    return music;
  }

  // async listMusicByUser({ limit, userId }): Promise<Music[]> {
  //   return this.musicModel.find({ user: userId }).limit(limit).exec();
  // }
}
