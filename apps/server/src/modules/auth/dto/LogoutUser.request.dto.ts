import { ILogoutUserRequestDto } from '@timelog/interfaces';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutUserRequestDto implements ILogoutUserRequestDto {
  @ApiProperty({
    example: 'sfdgsdfg2341fad',
    description: 'id пользователя',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'afa2fha5fdhiuah23',
    description: 'id устройства пользователя',
    required: true,
  })
  @IsString()
  deviceId: string;
}
