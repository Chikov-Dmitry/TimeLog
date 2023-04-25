import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserRequestDto } from '@timelog/interfaces';

export class CreateUserDto implements ICreateUserRequestDto {
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
    example: 'qwerty12',
    description: 'Пароль пользователя',
    required: true,
  })
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty({
    example: 'afa2fha5fdhiuah23',
    description: 'id устройства пользователя',
    required: true,
  })
  @IsString()
  deviceId: string;
}
