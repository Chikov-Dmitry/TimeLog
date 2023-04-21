import { IAuthUserResponseDto } from '@timelog/interfaces';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto implements IAuthUserResponseDto {
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

  constructor(model: IAuthUserResponseDto) {
    this.name = model.name;
    this.surname = model.surname;
    this.patronymic = model.patronymic;
    this.email = model.email;
  }
}
