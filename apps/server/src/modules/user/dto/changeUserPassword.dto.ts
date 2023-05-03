import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserPasswordDto {
  @ApiProperty({
    example: 'qwerty12',
    description: 'Старый пароль',
    required: true,
  })
  @IsString()
  oldPassword?: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'Новый пароль',
    required: true,
  })
  @MinLength(8)
  @IsString()
  newPassword?: string;
}
