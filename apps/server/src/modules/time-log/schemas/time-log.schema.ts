import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type TimeLogDocument = HydratedDocument<TimeLog>;

@Schema({ timestamps: true })
export class TimeLog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.Date, required: true })
  startDate: Date;

  @Prop({ type: mongoose.Schema.Types.Date, required: false })
  endDate?: Date;
}

export const TimeLogSchema = SchemaFactory.createForClass(TimeLog);
