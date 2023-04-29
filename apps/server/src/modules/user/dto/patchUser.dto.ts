import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IPatchUserRequestDto } from '@timelog/interfaces';

export class PatchUserDto implements IPatchUserRequestDto {
  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  @IsOptional()
  @IsString()
  surname: string;

  @ApiProperty({
    example: 'Иванович',
    description: 'Отчество пользователя',
  })
  @IsOptional()
  @IsString()
  patronymic: string;
}
