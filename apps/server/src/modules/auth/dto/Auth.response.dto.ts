import { IAuthUserResponseDto } from '@timelog/interfaces';
import { IsEmail, ValidateNested, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TokensDto } from '../../token/dto/tokens.dto';

export class AuthResponseDto implements Omit<IAuthUserResponseDto, 'deviceId'> {
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

  @ValidateNested()
  tokens: TokensDto;

  @IsArray()
  roles: string[];

  constructor(model: Omit<IAuthUserResponseDto, 'deviceId'>) {
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
    this.patronymic = model.patronymic;
    this.email = model.email;
    this.roles = model.roles;
    this.tokens = model.tokens;
  }
}
