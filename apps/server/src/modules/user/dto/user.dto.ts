import {IsEmail, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements ICreteUserDto {
  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
    required: true,
  })
  @IsString()
  surname: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество пользователя',
    required: true,
  })
  @IsString()
  patronymic: string;

  @ApiProperty({
    example: 'test@mail.com',
    description: 'E-mail пользователя',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qwerty',
    description: 'Пароль пользователя',
    required: true,
  })
  @MinLength(8)
  @IsString()
  password: string;
}

export interface ICreteUserDto {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  password: string;
}
