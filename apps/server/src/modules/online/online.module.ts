import { Module } from '@nestjs/common';
import { OnlineGateway } from './online.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Online, OnlineSchema } from './schemas/online.schema';
import { OnlineService } from './online.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Online.name, schema: OnlineSchema }]),
  ],
  controllers: [],
  providers: [OnlineGateway, OnlineService],
})
export class OnlineModule {}
