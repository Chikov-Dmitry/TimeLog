import { forwardRef, Module } from '@nestjs/common';
import { TimeLogController } from './time-log.controller';
import { TimeLogService } from './time-log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeLog, TimeLogSchema } from './schemas/time-log.schema';
import { OnlineModule } from '../online/online.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TimeLog.name, schema: TimeLogSchema }]),
    forwardRef(() => OnlineModule),
  ],
  controllers: [TimeLogController],
  providers: [TimeLogService],
  exports: [TimeLogService],
})
export class TimeLogModule {}
