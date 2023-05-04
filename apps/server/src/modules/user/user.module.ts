import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [TokenModule],
        useFactory: (tokenService: TokenService) => {
          const schema = UserSchema;
          schema.post('findOneAndDelete', (doc) => {
            if (!doc) return;
            const deletedUserId = doc._id;
            tokenService.removeTokenDocument(deletedUserId);
          });
          return schema;
        },
        inject: [TokenService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
