import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
    required: true,
  })
  @Prop({ required: true })
  surname: string;

  @ApiProperty({
    example: 25,
    description: 'Возраст пользователя',
    required: false,
  })
  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
