import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimeLog, TimeLogDocument } from './schemas/time-log.schema';
import { Model } from 'mongoose';
import { CreateTimeLogDto } from './dto/createTimeLog.dto';
import { StopTimeLogDto } from './dto/stopTimeLog.dto';
import { EditTimeLogDto } from './dto/editTimeLog.dto';

@Injectable()
export class TimeLogService {
  @InjectModel(TimeLog.name) private model: Model<TimeLogDocument>;

  async findLogById(id: string) {
    return this.model.findById(id);
  }

  async createLogEntry(data: CreateTimeLogDto) {
    try {
      return await this.model.create(data);
    } catch (e) {
      throw new BadRequestException('Ошибка создания записи', {
        cause: e,
        description: 'createLogEntry',
      });
    }
  }

  async stopLogEntry(data: StopTimeLogDto, logId: string) {
    try {
      const log = await this.findLogById(logId);
      await this.isLogEntryAlreadyFinished(logId);
      this.isEndDateMoreStartDate(data.endDate, log.startDate.getTime());
      log.endDate = new Date(Number(data.endDate));
      await log.save();
      return log;
    } catch (e) {
      throw new BadRequestException('Ошибка завершения записи', {
        cause: e,
        description: 'stopLogEntry',
      });
    }
  }

  async editLogEntry(data: EditTimeLogDto, logId: string) {
    try {
      const log = await this.findLogById(logId);

      if (data.startDate && !data.endDate) {
        this.isEndDateMoreStartDate(log.endDate.getTime(), data.startDate);
        log.startDate = new Date(Number(data.startDate));
      }
      if (data.endDate && !data.startDate) {
        this.isEndDateMoreStartDate(data.endDate, log.startDate.getTime());
        log.endDate = new Date(Number(data.endDate));
      }
      if (data.endDate && data.startDate) {
        this.isEndDateMoreStartDate(data.endDate, data.startDate);
        log.endDate = new Date(data.endDate);
        log.startDate = new Date(data.startDate);
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
}
