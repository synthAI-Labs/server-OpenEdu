import { IsString, IsArray, ValidateNested } from 'class-validator';

export class DashboardDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  bio: string;

  @IsString()
  photo: string;

  @IsString()
  email: string;

  @IsArray()
  @ValidateNested()
  interests: string[];

  @IsArray()
  @ValidateNested()
  settings: string[];
}
