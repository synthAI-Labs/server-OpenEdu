import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import Redis from 'ioredis';

/**
 * Service responsible for handling authentication-related operations.
 */
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, @Inject('REDIS') private redisClient: Redis) { }

  /**
   * Retrieves the status of the authentication service.
   * @returns A string indicating the status of the authentication service.
   */
  getStatus() {
    return 'Auth service is up';
  }

  /**
   * Generates a random token by combining a random string and a timestamp.
   * @returns The generated random token.
   */
  generateRandomToken(): string {
    const randomString = Math.random().toString(36).substring(2);
    const timestamp = Date.now();
    return `${randomString}${timestamp}`;
  }

  /**
   * Signs up a new user with the provided authentication data.
   * @param dto - The authentication data for the new user.
   * @returns The created user object.
   * @throws ForbiddenException if the username is already taken, password is less than 8 characters,
   * name or username is less than 1 character, or if the email already exists.
   */
  async signup(dto: AuthDto) {
    if (!dto.email || dto.email.length <= 1 || !dto.password || dto.password.length <= 1 || !dto.name || dto.name.length <= 1 || !dto.username || dto.username.length <= 1) {
      return new ForbiddenException('Missing required fields');
    }
    try {
      const sameUserName = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });

      if (sameUserName) {
        return new ForbiddenException('Username Already taken');
      }

      if (dto.password.length < 8) {
        return new ForbiddenException('Password must be at least 8 characters');
      }


      if (dto.name.length < 1 || dto.username.length < 1) {
        return new ForbiddenException(
          'Name and username must be at least 1 character',
        );
      }

      const token = this.generateRandomToken();
      const verificationCode = this.generateVerificationCode();
      const isCodeSent = await this.sendVerificationCode(
        dto.email,
        verificationCode,
      )

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: dto.password,
          name: dto.name,
          username: dto.username,
          emailVerified: false,
          token: token,
          photo: '',
          bio: '',
          role: 'user',
          settings: {
            create: {
              userId: 1,
            }
          },
        },
        include: {
          settings: true,
        },
      });

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          settings: {
            update: {
              userId: user.id,
            }
          }
        },
        include: {
          settings: true,
        },
      });

      try {
        await this.redisClient.set(user.email, verificationCode);
      } catch (error) {
        return (error)
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return new ForbiddenException('Email already exists');
        }
      }

      throw error;
    }
  }

  async confirmEmail(userEmail: string, userGivenCode: string) {
    const verificationCode = await this.redisClient.get(userEmail);

    if (!verificationCode) {
      return new ForbiddenException('No verification code found');
    }

    if (verificationCode === userGivenCode) {
      await this.redisClient.del(userEmail);

      const user = await this.prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          emailVerified: true,
        },
      });
      return user;
    } else {
      return new ForbiddenException('Invalid verification code');
    }

  }

  generateVerificationCode(): string {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    return code;
  }

  async sendVerificationCode(email: string, code: string): Promise<boolean> {
    const isCodeVerified = await this.mockEmailService.sendVerificationCode(
      email,
      code,
    );
    return isCodeVerified;
  }

  mockEmailService = {
    async sendVerificationCode(email: string, code: string): Promise<boolean> {
      console.log(`Sending verification code ${code} to ${email}`);
      return code === '1234';
    },
  };

  /**
   * Signs in a user with the provided authentication data.
   * @param dto - The authentication data for the user.
   * @returns The signed-in user object.
   * @throws ForbiddenException if no user with the provided email is found or if the password is invalid.
   */
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      return new ForbiddenException('No user with email found');
    }

    const isPasswordValid = user.password === dto.password;

    if (!isPasswordValid) {
      return new ForbiddenException('Invalid password');
    }

    delete user.password;
    return user;
  }
}
