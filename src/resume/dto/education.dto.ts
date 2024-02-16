import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EducationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  school: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  field: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class ExperienceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  company: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  position: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class ProjectsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsString()
  @ApiProperty()
  DeployedLink: string;

  @IsString()
  @ApiProperty()
  Githublink: string;
}

export class SkillsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level: string;
}
