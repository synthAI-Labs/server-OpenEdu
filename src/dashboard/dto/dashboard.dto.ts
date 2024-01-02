import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';

export class DashboardDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  bio: string;

  @IsString()
  @ApiProperty()
  photo: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsArray()
  @ApiProperty()
  @ValidateNested()
  interests: string[];
}
