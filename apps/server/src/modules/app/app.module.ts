import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '../../common/guards/accessToken.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { TimeLogModule } from '../time-log/time-log.module';
import { OnlineModule } from '../online/online.module';
import { AtWorkModule } from '../at-work/at-work.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '../../.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('MONGO_DATABASE_URL')}${configService.get(
          'MONGO_DATABASE',
        )}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TokenModule,
    TimeLogModule,
    OnlineModule,
    AtWorkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
