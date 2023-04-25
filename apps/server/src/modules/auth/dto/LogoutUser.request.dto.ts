import { ILogoutUserRequestDto } from '@timelog/interfaces';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutUserRequestDto implements ILogoutUserRequestDto {
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
}
