import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type AtWorkDocument = HydratedDocument<AtWork>;

@Schema()
export class AtWork {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: User;
}

export const AtWorkSchema = SchemaFactory.createForClass(AtWork);
