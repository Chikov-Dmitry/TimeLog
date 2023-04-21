import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ICreateUserRequestDto } from '@timelog/interfaces';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements ICreateUserRequestDto {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
