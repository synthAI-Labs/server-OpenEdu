import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InterviewDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  job_description: string;
}

export class QuestionAnalysisDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  answer: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;
}
