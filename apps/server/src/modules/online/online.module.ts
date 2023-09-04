import { forwardRef, Module } from '@nestjs/common';
import { OnlineGateway } from './online.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Online, OnlineSchema } from './schemas/online.schema';
import { OnlineService } from './online.service';
import { UserModule } from '../user/user.module';
import { AtWorkModule } from '../at-work/at-work.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Online.name, schema: OnlineSchema }]),
    UserModule,
    forwardRef(() => AtWorkModule),
  ],
  controllers: [],
  providers: [OnlineGateway, OnlineService],
  exports: [OnlineGateway, OnlineService],
})
export class OnlineModule {}
