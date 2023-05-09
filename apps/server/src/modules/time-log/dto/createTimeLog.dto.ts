import { ITimeLogDto } from '@timelog/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTimeLogDto implements ITimeLogDto {
  @ApiProperty({
    example: '41534tfdsfsdfg351',
    description: 'ID пользователя',
    required: true,
  })
  @IsString()
  user: string;

  @ApiProperty({
    description: 'timestamp даты начала',
    required: true,
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    description: 'timestamp даты завершения',
    required: false,
  })
  @IsOptional()
  @IsString()
  endDate?: string;
}
