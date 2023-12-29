import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
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
  ) { }

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
  async sendVerificationCode(email: string, code: string) {
    try {
      const subject = 'OTP for Verification';
      const text =
        'Thankyou for registering with us. Your OTP is ' +
        code +
        '. Please enter this OTP to verify your account.';

      const res = sendEmail(email, subject, text);
      return res;
    } catch (error) {
      return error;
    }
  }

  /**
   * Signs up a new user with the provided authentication data.
   * @param dto - The authentication data for the new user.
   * @returns The created user object.
   * @returns ForbiddenException if the username is already taken, password is less than 8 characters,
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
        return new ForbiddenException('Missing required fields');
      }

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
      const res = await this.sendVerificationCode(dto.email, verificationCode);
      console.log(res);

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
          return new ForbiddenException('Email already exists');
        }
      }

      return error;
    }
  }

  /**
   * Confirms the email of a user by comparing the verification code.
   * @param userEmail - The email of the user.
   * @param userGivenCode - The verification code provided by the user.
   * @returns The updated user object if the verification code is valid.
   * @returns ForbiddenException if no verification code is found, or if the verification code is invalid.
   */
  async confirmEmail(userEmail: string, userGivenCode: string) {
    try {
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
    } catch (error) {
      return error;
    }
  }

  async signOut(token: string, userId: string) {
    try {
      const userAvailable = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token
        },
        select: {
          token: true
        }
      })

      if (!userAvailable) {
        const Error = {
          "status": 400,
          "message": "Not Found"
        }
        return Error
      }

      const newToken = this.generateRandomToken()
      console.log(newToken)

      const updateUser = await this.prisma.user.update({
        where: {
          id: parseInt(userId)
        },
        data: {
          token: newToken
        }
      })

      console.log(updateUser)

      const success = {
        "status": 200,
        "message": "User Logged Out successfully"
      }
      return success
    } catch {
      console.log("Error")
      throw new BadRequestException("Invalid Request")
    }
  }

  /**
   * Signs in a user with the provided authentication data.
   * @param dto - The authentication data for the user.
   * @returns The signed-in user object.
   * @returns ForbiddenException if no user with the provided email is found or if the password is invalid.
   */
  async signin(dto: LoginDto) {
    try {
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
    } catch (error) {
      return error;
    }
  }
}
