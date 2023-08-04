import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Online, OnlineDocument } from './schemas/online.schema';
import { UserOnlineDto } from '@timelog/interfaces';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { TimeLogService } from '../time-log/time-log.service';

@Injectable()
export class OnlineService {
  @InjectModel(Online.name) private model: Model<OnlineDocument>;

  constructor(
    private readonly userService: UserService,
    private readonly timeLogService: TimeLogService,
  ) {}

  async getOnlineList(): Promise<UserOnlineDto> {
    try {
      const res = await this.model.find();
      const userIds: UserOnlineDto = [];
      for (const item of res) {
        const user = await this.userService.findById(item.user.toString());
        const { id, name, surname, patronymic, email } = user;
        const userId = new UserDto({ id, name, surname, patronymic, email });
        const log = await this.timeLogService.getStartedButNotStoppedLog(id);
        let onWork = false;
        if (log) onWork = true;

        userIds.push({ onWork, ...userId });
      }
      return userIds;
    } catch (e) {
      throw new BadRequestException('Ошибка получения записи', {
        cause: e,
        description: 'getOnlineList',
      });
    }
  }

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
