import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type OnlineDocument = HydratedDocument<Online>;

@Schema()
export class Online {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: User;
}

export const OnlineSchema = SchemaFactory.createForClass(Online);
