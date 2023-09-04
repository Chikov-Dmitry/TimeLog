import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtWork, AtWorkDocument } from './schemas/at-work.schema';
import { UserAtWorkDto } from '@timelog/interfaces/src/socket/UserAtWorkDto';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { AtWorkGateway } from './at-work.gateway';
import { OnlineService } from '../online/online.service';
import { OnlineGateway } from '../online/online.gateway';

@Injectable()
export class AtWorkService {
  @InjectModel(AtWork.name) private model: Model<AtWorkDocument>;

  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AtWorkGateway))
    private readonly atWorkGateway: AtWorkGateway,
    @Inject(forwardRef(() => OnlineService))
    private readonly onlineService: OnlineService,
    private readonly onlineGateway: OnlineGateway,
  ) {}

  async getAtWorkList(): Promise<UserAtWorkDto> {
    try {
      const res = await this.model.find();
      const userIds: UserAtWorkDto = [];
      for (const item of res) {
        const user = await this.userService.findById(item.user.toString());
        const { id, name, surname, patronymic, email } = user;
        const userId = new UserDto({ id, name, surname, patronymic, email });
        const isOnline = await this.onlineService.isUserOnline(id);
        let online = false;
        if (isOnline) online = true;

        userIds.push({ online, ...userId });
      }
      return userIds;
    } catch (e) {}
  }

  async addToAtWork(userId: string) {
    try {
      const res = await this.model
        .create({ user: userId })
        .catch((e) => console.log(e));
      this.atWorkGateway.server.emit('atWorkList', await this.getAtWorkList());
      this.onlineGateway.server.emit(
        'onlineList',
        await this.onlineService.getOnlineList(),
      );

      return res;
    } catch (e) {
      throw new BadRequestException('Ошибка создания записи', {
        cause: e,
        description: 'addToAtWork',
      });
    }
  }

  async deleteFromAtWork(userId: string) {
    try {
      const res = await this.model
        .findOneAndDelete({ user: userId })
        .catch((e) => console.log(e));
      this.atWorkGateway.server.emit('atWorkList', await this.getAtWorkList());
      this.onlineGateway.server.emit(
        'onlineList',
        await this.onlineService.getOnlineList(),
      );
      return res;
    } catch (e) {
      throw new BadRequestException('Ошибка удаления записи', {
        cause: e,
        description: 'DeleteFromToAtWork',
      });
    }
  }

  async isUserWorking(userId: string) {
    try {
      return await this.model.findOne({ user: userId });
    } catch (e) {
      throw new BadRequestException('Ошибка поиска записи', {
        cause: e,
        description: 'isUserWorking',
      });
    }
  }
}
