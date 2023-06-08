import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimeLog, TimeLogDocument } from './schemas/time-log.schema';
import { Model } from 'mongoose';
import { CreateTimeLogDto } from './dto/createTimeLog.dto';
import { StopTimeLogDto } from './dto/stopTimeLog.dto';
import { EditTimeLogDto } from './dto/editTimeLog.dto';
import { ResponseTimeLogDto } from './dto/responseTimeLog.dto';
import {
  ITimeLogResponseDto,
  ITimeLogsByTimeRangeRequest,
} from '@timelog/interfaces';

@Injectable()
export class TimeLogService {
  @InjectModel(TimeLog.name) private model: Model<TimeLogDocument>;

  async findLogById(id: string) {
    return this.model.findById(id);
  }

  async createLogEntry(data: CreateTimeLogDto) {
    try {
      await this.isAlreadyExistNotStoppedLog(data.user);
      const log = await this.model.create(data);
      const { id, user, startDate, endDate } = log;
      return new ResponseTimeLogDto({
        id: id,
        userId: user.toString(),
        startDate: startDate,
        endDate: endDate,
      });
    } catch (e) {
      throw new BadRequestException(e.message || 'Ошибка создания записи', {
        cause: e,
        description: 'createLogEntry',
      });
    }
  }

  async stopLogEntry(data: StopTimeLogDto, logId: string) {
    try {
      const log = await this.findLogById(logId);
      await this.isLogEntryAlreadyFinished(logId);
      this.isEndDateMoreStartDate(data.endDate, log.startDate);
      log.endDate = data.endDate;
      await log.save();
      const { id, user, startDate, endDate } = log;
      return new ResponseTimeLogDto({
        id: id,
        userId: user.toString(),
        startDate: startDate,
        endDate: endDate,
      });
    } catch (e) {
      throw new BadRequestException('Ошибка завершения записи', {
        cause: e,
        description: 'stopLogEntry',
      });
    }
  }

  async getStartedButNotStoppedLog(
    userId: string,
  ): Promise<ITimeLogResponseDto | null> {
    const logs = await this.model.find({ user: userId });
    if (!logs.length) return null;
    const notStoppedLog = await this.model
      .find({ user: userId })
      .exists('endDate', false);
    if (!notStoppedLog.length) return null;
    const { id, user, startDate, endDate } = notStoppedLog[0];
    return new ResponseTimeLogDto({
      id: id,
      userId: user.toString(),
      startDate: startDate,
      endDate: endDate,
    });
  }

  async editLogEntry(data: EditTimeLogDto, logId: string) {
    try {
      const log = await this.findLogById(logId);

      if (data.startDate && !data.endDate) {
        this.isEndDateMoreStartDate(log.endDate, data.startDate);
        log.startDate = data.startDate;
      }
      if (data.endDate && !data.startDate) {
        this.isEndDateMoreStartDate(data.endDate, log.startDate);
        log.endDate = data.endDate;
      }
      if (data.endDate && data.startDate) {
        this.isEndDateMoreStartDate(data.endDate, data.startDate);
        log.endDate = data.endDate;
        log.startDate = data.startDate;
      }
      await log.save();
      return log;
    } catch (e) {
      throw new BadRequestException('Ошибка редактирования записи', {
        cause: e,
        description: 'editLogEntry',
      });
    }
  }

  async deleteLogEntry(logId: string) {
    try {
      const log = await this.model.findByIdAndDelete({ _id: logId });
      return log;
    } catch (e) {
      throw new BadRequestException('Ошибка удаления записи', {
        cause: e,
        description: 'deleteLogEntry',
      });
    }
  }

  async getLogsByTimeRange(
    data: ITimeLogsByTimeRangeRequest,
  ): Promise<ResponseTimeLogDto[]> {
    try {
      const logs = await this.model.find({
        user: data.userId,
        startDate: { $gte: data.startTimestamp, $lte: data.endTimestamp },
      });
      const res: ResponseTimeLogDto[] = [];
      logs.forEach((log) => {
        const { id, user, startDate, endDate } = log;
        res.push(
          new ResponseTimeLogDto({
            id: id,
            userId: user.toString(),
            startDate: startDate,
            endDate: endDate,
          }),
        );
      });
      return res;
    } catch (e) {}
  }

  isEndDateMoreStartDate(endDate: string | number, startDate: string | number) {
    if (!(Number(endDate) - Number(startDate)))
      throw new BadRequestException(
        'Дата завершения не может быть меньше, чем дата начала',
      );
  }
  async isLogEntryAlreadyFinished(logId) {
    const log = await this.findLogById(logId);
    const isEnded = log.endDate;
    if (isEnded) throw new BadRequestException('Запись уже остановлена');
  }

  async isAlreadyExistNotStoppedLog(userId) {
    const logs = await this.model.find({ user: userId });
    if (!logs.length) return false;
    const existNotStoppedLog = await this.model
      .find({ user: userId })
      .exists('endDate', false);
    if (existNotStoppedLog.length)
      throw new BadRequestException('Уже существует не остановленная запись');
  }
}
