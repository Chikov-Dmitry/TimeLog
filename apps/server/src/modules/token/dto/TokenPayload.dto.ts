import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

interface ITokenPayloadDto {
  id: string;
  deviceId: string;
}

export class TokenPayloadDto implements ITokenPayloadDto {
  @ApiProperty({
    example: 'sfdgsdfg2341fad',
    description: 'ID пользователя',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'afa2fha5fdhiuah23',
    description: 'Уникальная строка id устройства пользователя',
    required: true,
  })
  @IsString()
  deviceId: string;

  constructor(model: ITokenPayloadDto) {
    this.id = model.id;
    this.deviceId = model.deviceId;
  }
}
