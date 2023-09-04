import { Module } from '@nestjs/common';
import { TimeLogController } from './time-log.controller';
import { TimeLogService } from './time-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeLog, TimeLogSchema } from './schemas/time-log.schema';
import { AtWorkModule } from '../at-work/at-work.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeLog.name, schema: TimeLogSchema }]),
    AtWorkModule,
  ],
  controllers: [TimeLogController],
  providers: [TimeLogService],
  exports: [TimeLogService],
})
export class TimeLogModule {}
