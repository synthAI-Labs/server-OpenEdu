import { IsString, IsNotEmpty } from "class-validator";

export class DashboardDto {
    @IsString()
    name: string;

    @IsString()
    username: string;
    // "username": "john_doe",
    // "name": "Updated Name",
    // "email": "john@example.com",
    // "photo": "/path/to/new/photo",

    @IsString()
    bio: string;

    @IsString()
    photo: string;

    @IsString()
    email: string;
}