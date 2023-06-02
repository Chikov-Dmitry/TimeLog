import { ITimeLogResponseDto } from '@timelog/interfaces/src/dtoInterface/ITimeLog.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ResponseTimeLogDto implements ITimeLogResponseDto {
  @ApiProperty({
    example: '41534tfdsfsdfg352',
    description: 'ID записи',
    required: true,
  })
  @IsString()
  id: string;
  @ApiProperty({
    example: '41534tfdsfsdfg351',
    description: 'ID пользователя',
    required: true,
  })
  @IsString()
  userId: string;

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

  constructor(model: ITimeLogResponseDto) {
    this.id = model.id;
    this.userId = model.userId;
    this.startDate = model.startDate;
    this.endDate = model.endDate;
  }
}
