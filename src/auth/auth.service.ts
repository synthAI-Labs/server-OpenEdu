import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    generateRandomToken(): string {
        const randomString = Math.random().toString(36).substring(2);
        const timestamp = Date.now();
        return `${randomString}${timestamp}`;
    }

    async signup(dto: AuthDto) {
        try {
            const sameUserName = await this.prisma.user.findUnique({
                where: {
                    username: dto.username,
                },
            });

            if (sameUserName) {
                throw new ForbiddenException('Username Already taken');
            }

            if (dto.password.length < 8) {
                throw new ForbiddenException('Password must be at least 8 characters');
            }

            // Add other password validation checks here

            if (dto.name.length < 1 || dto.username.length < 1) {
                throw new ForbiddenException('Name and username must be at least 1 character');
            }

            const token = this.generateRandomToken();

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: dto.password,
                    name: dto.name,
                    username: dto.username,
                    token: token,
                    photo: '',
                    bio: '',
                    role: 'user',
                },
            });

            delete user.password;
            return user;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }

            throw error;
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new ForbiddenException('No user with email found');
        }

        const isPasswordValid = user.password === dto.password;

        if (!isPasswordValid) {
            throw new ForbiddenException('Invalid password');
        }

        delete user.password;
        return user;
    }
}
