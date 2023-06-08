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

@ApiTags('TimeLog')
@Controller('time-log')
export class TimeLogController {
  constructor(private readonly timeLogService: TimeLogService) {}

  @Post('create')
  createLogEntry(@Body() data: CreateTimeLogDto): Promise<ITimeLogResponseDto> {
    const { user, startDate, endDate } = data;
    return this.timeLogService.createLogEntry({ user, startDate, endDate });
  }

  @Post('stop/:logID')
  stopLogEntry(@Body() data: StopTimeLogDto, @Param('logID') logID: string) {
    const { endDate } = data;
    return this.timeLogService.stopLogEntry({ endDate }, logID);
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
