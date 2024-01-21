import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InterviewDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  job_description: string;
}
