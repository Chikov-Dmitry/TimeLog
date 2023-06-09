import { ILoginUserRequestDto } from '@timelog/interfaces';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequestDto implements ILoginUserRequestDto {
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
