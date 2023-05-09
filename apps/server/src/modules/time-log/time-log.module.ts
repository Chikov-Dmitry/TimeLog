import { Module } from '@nestjs/common';
import { TimeLogController } from './time-log.controller';
import { TimeLogService } from './time-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeLog, TimeLogSchema } from './schemas/time-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeLog.name, schema: TimeLogSchema }]),
  ],
  controllers: [TimeLogController],
  providers: [TimeLogService],
})
export class TimeLogModule {}
