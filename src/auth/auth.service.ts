import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import Redis from 'ioredis';
import sendEmail from 'src/email/email';

/**
 * Service responsible for handling authentication-related operations.
 */
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS') private redisClient: Redis,
  ) {}

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
   * Generates a random verification code.
   * @returns The generated verification code.
   */
  generateVerificationCode(): string {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    return code;
  }

  /**
   * Sends a verification code to the provided email address.
   * @param email - The email address to send the verification code to.
   * @param code - The verification code to send.
   * @returns A boolean indicating whether the code was successfully sent.
   */
  async sendVerificationCode(email: string, code: string): Promise<boolean> {
    try {
      const subject = 'OTP for Verification';
      const text =
        'Thankyou for registering with us. Your OTP is ' +
        code +
        '. Please enter this OTP to verify your account.';

      const res = await sendEmail(email, subject, text);
      return res;
    } catch (error) {
      return false;
    }
  }

  /**
   * Signs up a new user with the provided authentication data.
   * @param dto - The authentication data for the new user.
   * @returns The created user object.
   * @throws ForbiddenException if the username is already taken, password is less than 8 characters,
   * name or username is less than 1 character, or if the email already exists.
   */
  async signup(dto: AuthDto) {
    try {
      if (
        !dto.email ||
        dto.email.length <= 1 ||
        !dto.password ||
        dto.password.length <= 1 ||
        !dto.name ||
        dto.name.length <= 1 ||
        !dto.username ||
        dto.username.length <= 1
      ) {
        throw new ForbiddenException('Missing required fields');
      }

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

      if (dto.name.length < 1 || dto.username.length < 1) {
        throw new ForbiddenException(
          'Name and username must be at least 1 character',
        );
      }

      const token = this.generateRandomToken();
      const verificationCode = this.generateVerificationCode();
      const res: boolean = await this.sendVerificationCode(
        dto.email,
        verificationCode,
      );

      if (!res) {
        throw new ForbiddenException('Error sending verification code');
      }

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
            },
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
            },
          },
        },
        include: {
          settings: true,
        },
      });

      try {
        await this.redisClient.set(user.email, verificationCode);
      } catch (error) {
        return error;
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }

      throw error;
    }
  }

  /**
   * Confirms the email of a user by comparing the verification code.
   * @param userEmail - The email of the user.
   * @param userGivenCode - The verification code provided by the user.
   * @returns The updated user object if the verification code is valid.
   * @throws ForbiddenException if no verification code is found, or if the verification code is invalid.
   */
  async confirmEmail(userEmail: string, userGivenCode: string) {
    try {
      const verificationCode = await this.redisClient.get(userEmail);

      if (!verificationCode) {
        throw new ForbiddenException('No verification code found');
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
        throw new ForbiddenException('Invalid verification code');
      }
    } catch (error) {
      throw error;
    }
  }

  async signOut(token: string, userId: string) {
    try {
      const userAvailable = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
        select: {
          token: true,
        },
      });

      if (!userAvailable) {
        throw new BadRequestException('Not Found');
      }

      const newToken = this.generateRandomToken();

      await this.prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          token: newToken,
        },
      });

      return {
        status: 200,
        message: 'User Logged Out successfully',
      };
    } catch {
      throw new BadRequestException('Invalid Request');
    }
  }

  async resetPassword(token: string, userId: string, password: string) {
    if (
      !password ||
      password === null ||
      password === undefined ||
      password.length < 8
    ) {
      throw new ForbiddenException('Password must be valid');
    }

    let parsedUserId: number;

    try {
      parsedUserId = parseInt(userId);
    } catch {
      throw new BadRequestException('Invalid Request');
    }

    const userAvailable = await this.prisma.user.findUnique({
      where: {
        id: parsedUserId,
        token: token,
      },
    });

    if (!userAvailable) {
      throw new BadRequestException('Not Found');
    }

    await this.prisma.user.update({
      where: {
        id: parsedUserId,
      },
      data: {
        password: password,
      },
    });

    return {
      status: 200,
      message: 'Password Reset successfully',
    };
  }

  /**
   * Signs in a user with the provided authentication data.
   * @param dto - The authentication data for the user.
   * @returns The signed-in user object.
   * @throws ForbiddenException if no user with the provided email is found or if the password is invalid.
   */
  async signin(dto: LoginDto) {
    try {
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
    } catch (error) {
      throw error;
    }
  }
}
