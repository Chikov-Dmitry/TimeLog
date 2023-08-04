import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeLogService } from './time-log.service';
import { CreateTimeLogDto } from './dto/createTimeLog.dto';
import { EditTimeLogDto } from './dto/editTimeLog.dto';
import { StopTimeLogDto } from './dto/stopTimeLog.dto';
import {
  ITimeLogResponseDto,
  ITimeLogsByTimeRangeRequest,
} from '@timelog/interfaces';
import { OnlineGateway } from '../online/online.gateway';

@ApiTags('TimeLog')
@Controller('time-log')
export class TimeLogController {
  constructor(
    private readonly timeLogService: TimeLogService,
    private readonly onlineGateway: OnlineGateway,
  ) {}

  @Post('create')
  async createLogEntry(
    @Body() data: CreateTimeLogDto,
  ): Promise<ITimeLogResponseDto> {
    const { user, startDate, endDate } = data;

    const log = this.timeLogService.createLogEntry({
      user,
      startDate,
      endDate,
    });
    const onlineList = await this.onlineGateway.getOnlineList();
    this.onlineGateway.server.emit('onlineList', onlineList);
    return log;
  }

  @Post('stop/:logID')
  async stopLogEntry(
    @Body() data: StopTimeLogDto,
    @Param('logID') logID: string,
  ) {
    const { endDate } = data;
    const log = this.timeLogService.stopLogEntry({ endDate }, logID);
    const onlineList = await this.onlineGateway.getOnlineList();
    this.onlineGateway.server.emit('onlineList', onlineList);
    return log;
  }

  @Get('started-log/:userId')
  startedButNotStopped(@Param('userId') userId: string) {
    return this.timeLogService.getStartedButNotStoppedLog(userId);
  }

  @Post('edit/:logID')
  editLogEntry(@Body() data: EditTimeLogDto, @Param('logID') logID: string) {
    const { startDate, endDate } = data;
    return this.timeLogService.editLogEntry({ startDate, endDate }, logID);
  }

  @Delete('delete/:logID')
  deleteLogEntry(@Param('logID') logID: string) {
    return this.timeLogService.deleteLogEntry(logID);
  }

  @Post('logs-by-time-range')
  getLogsByTimeRange(@Body() data: ITimeLogsByTimeRangeRequest) {
    return this.timeLogService.getLogsByTimeRange(data);
  }
}
