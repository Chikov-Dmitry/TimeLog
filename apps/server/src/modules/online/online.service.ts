import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Online, OnlineDocument } from './schemas/online.schema';

@Injectable()
export class OnlineService {
  @InjectModel(Online.name) private model: Model<OnlineDocument>;

  async addToOnline(userId: string) {
    try {
      return await this.model
        .create({ user: userId })
        .catch((e) => console.log(e));
    } catch (e) {
      throw new BadRequestException('Ошибка создания записи', {
        cause: e,
        description: 'addToOnline',
      });
    }
  }

  async deleteFromOnline(userId: string) {
    try {
      return await this.model
        .findOneAndDelete({ user: userId })
        .catch((e) => console.log(e));
    } catch (e) {
      throw new BadRequestException('Ошибка удаления записи', {
        cause: e,
        description: 'deleteFromOnline',
      });
    }
  }
}
