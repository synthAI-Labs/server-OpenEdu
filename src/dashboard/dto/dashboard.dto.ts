import { IsString } from 'class-validator';

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
}
