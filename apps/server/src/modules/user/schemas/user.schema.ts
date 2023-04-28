import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ICreateUserRequestDto } from '@timelog/interfaces';
import { Role } from '../../../common/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements Omit<ICreateUserRequestDto, 'deviceId'> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  patronymic: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Role.User })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
