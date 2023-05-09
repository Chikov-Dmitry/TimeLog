import { ITimeLogDto } from '@timelog/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StopTimeLogDto implements Required<Pick<ITimeLogDto, 'endDate'>> {
  @ApiProperty({
    description: 'timestamp даты завершения',
    required: true,
  })
  @IsString()
  endDate: string;
}
