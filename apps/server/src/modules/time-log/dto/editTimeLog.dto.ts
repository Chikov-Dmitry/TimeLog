import { ITimeLogDto } from '@timelog/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditTimeLogDto implements Partial<ITimeLogDto> {
  @ApiProperty({
    description: 'timestamp даты начала',
    required: false,
  })
  @IsOptional()
  @IsString()
  startDate: string;

  @ApiProperty({
    description: 'timestamp даты завершения',
    required: false,
  })
  @IsOptional()
  @IsString()
  endDate: string;
}
