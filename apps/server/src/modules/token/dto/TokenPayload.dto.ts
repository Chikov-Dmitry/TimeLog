import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';

interface ITokenPayloadDto {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  deviceId: string;
  roles: string[];
}

export class TokenPayloadDto {
  @ApiProperty({
    example: 'sfdgsdfg2341fad',
    description: 'ID пользователя',
    required: true,
  })
  @IsString()
  id: string;

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
    example: 'afa2fha5fdhiuah23',
    description: 'Уникальная строка id устройства пользователя',
    required: true,
  })
  @IsString()
  deviceId: string;

  @IsArray()
  roles: string[];

  constructor(model: ITokenPayloadDto) {
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
    this.patronymic = model.patronymic;
    this.email = model.email;
    this.deviceId = model.deviceId;
    this.roles = model.roles;
  }
}
