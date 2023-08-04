import { forwardRef, Module } from '@nestjs/common';
import { OnlineGateway } from './online.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Online, OnlineSchema } from './schemas/online.schema';
import { OnlineService } from './online.service';
import { UserModule } from '../user/user.module';
import { TimeLogModule } from '../time-log/time-log.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Online.name, schema: OnlineSchema }]),
    UserModule,
    forwardRef(() => TimeLogModule),
  ],
  controllers: [],
  providers: [OnlineGateway, OnlineService],
  exports: [OnlineGateway],
})
export class OnlineModule {}
