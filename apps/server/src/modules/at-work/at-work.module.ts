import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AtWork, AtWorkSchema } from './schemas/at-work.schema';
import { AtWorkGateway } from './at-work.gateway';
import { AtWorkService } from './at-work.service';
import { OnlineModule } from '../online/online.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AtWork.name, schema: AtWorkSchema }]),
    UserModule,
    forwardRef(() => OnlineModule),
  ],
  providers: [AtWorkGateway, AtWorkService],
  exports: [AtWorkService, AtWorkGateway],
})
export class AtWorkModule {}
