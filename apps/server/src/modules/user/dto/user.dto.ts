import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IUserResponseDto } from '@timelog/interfaces';

export class UserDto implements IUserResponseDto {
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
  @IsOptional()
  @IsString()
  surname: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество пользователя',
    required: true,
  })
  @IsOptional()
  @IsString()
  patronymic: string;

  @ApiProperty({
    example: 'test@mail.com',
    description: 'E-mail пользователя',
    required: true,
  })
  @IsEmail()
  email: string;

  constructor(model: IUserResponseDto) {
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
    this.patronymic = model.patronymic;
    this.email = model.email;
  }
}
