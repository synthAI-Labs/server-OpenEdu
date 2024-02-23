import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto, ResetPasswordDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import Redis from 'ioredis';
import sendEmail from 'src/email/email';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * Service responsible for handling authentication-related operations.
 */
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS') private redisClient: Redis,
    private jwtService: JwtService,
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
  async sendVerificationCode(
    email: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    try {
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
  async signup(dto: AuthDto, response) {
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
        return {
          status: 403,
          message: 'All feilds are required',
        };
      }

      const sameUserName = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });

      if (sameUserName) {
        return {
          status: 403,
          message: 'Username already taken',
        };
      }

      if (dto.password.length < 8) {
        return {
          status: 403,
          message: 'Password should be greater than 8 words',
        };
      }

      const token = this.generateRandomToken();
      const verificationCode = this.generateVerificationCode();

      const subject = 'OTP for Verification';
      const text = `
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h1 style="font-size: 20px; margin-bottom: 20px;">OTP for Verification</h1>
      <p style="font-size: 20px; margin-bottom: 20px;">
        Thank you for registering with us. <br> Your OTP is <strong>${verificationCode}</strong>. <br>Please enter this OTP to verify your account.
      </p>
      <p style="font-size: 16px; margin-top: 20px;">Regard,<br>OpenEDU team at SynthAI Lab</p>
      </div>
      `;

      const res: boolean = await this.sendVerificationCode(
        dto.email,
        subject,
        text,
      );

      if (!res) {
        return {
          status: 500,
          message: 'Error sending verification code',
        };
      }

      const images: string[] = [
        'boy1.png',
        'boy2.png',
        'boy3.png',
        'boy4.png',
        'boy5.png',
        'boy6.png',
        'boy7.png',
        // "girl1.png", "girl2.png", "girl3.png", "girl4.png", "girl5.png", "girl6.png", "girl7.png",
      ];
      const randomImage = images[Math.floor(Math.random() * images.length)];

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          username: dto.username,
          emailVerified: false,
          token: token,
          photo: randomImage,
          bio: '',
          role: 'user',
          settings: {
            create: {
              userId: '1',
            },
          },
          EmailServiceSubscription: {
            create: {
              userId: '1',
            },
          },
        },
        include: {
          settings: true,
          EmailServiceSubscription: true,
          CourseEnrollment: true,
          achievements: true,
        },
      });

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          settings: {
            update: {
              userId: user.id,
            },
          },
          EmailServiceSubscription: {
            update: {
              userId: user.id,
            },
          },
        },
      });

      try {
        await this.redisClient.set(user.email, verificationCode);
      } catch (error) {
        return {
          status: 500,
          message: `Error with Reddis. ${error}`,
        };
      }

      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token: string = this.jwtService.sign(payload) || '';

      // Set the access_token as a cookie
      response.cookie('access_token', access_token, { httpOnly: true });

      // Omitting the password from the result before sending it
      delete user.password;

      return {
        status: 200,
        message: 'Sign In Successfull',
        data: user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return {
            status: 403,
            message: 'Email already exists',
          };
        }
      }

      return {
        status: 500,
        message: 'Internal server errors',
      };
    }
  }

  /**
   * Confirms the email of a user by comparing the verification code.
   * @param userEmail - The email of the user.
   * @param userGivenCode - The verification code provided by the user.
   * @returns The updated user object if the verification code is valid.
   * @throws ForbiddenException if no verification code is found, or if the verification code is invalid.
   */
  async confirmEmail(userEmail: string, userGivenCode: number) {
    try {
      console.log(userEmail, userGivenCode);
      const userAvailable = await this.prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!userAvailable) {
        return {
          status: 404,
          message: 'No user with email found',
        };
        // throw new ForbiddenException('No user with email found');
      }

      const verificationCode = await this.redisClient.get(userEmail);

      console.log(verificationCode);

      if (!verificationCode) {
        return {
          status: 404,
          message: 'No verification code found',
        };
        // throw new ForbiddenException('No verification code found');
      }

      if (parseInt(verificationCode) == userGivenCode) {
        await this.redisClient.del(userEmail);

        const user = await this.prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            emailVerified: true,
          },
        });

        delete user.password;
        return user;
      } else {
        return {
          status: 403,
          message: 'Invalid verification code',
        };
        // throw new ForbiddenException('Invalid verification code');
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }

  async signOut(token: string, userId: string) {
    try {
      const userAvailable = await this.prisma.user.findUnique({
        where: {
          id: userId,
          token: token,
        },
        select: {
          token: true,
        },
      });

      if (!userAvailable) {
        return {
          status: 403,
          message: 'User Not Found',
        };
        // throw new BadRequestException('Not Found');
      }

      const newToken = this.generateRandomToken();

      await this.prisma.user.update({
        where: {
          id: userId,
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
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }

  /**
   * Sends a verification code to the user's email for password reset.
   * @param token - The token associated with the password reset request.
   * @param userId - The ID of the user requesting the password reset.
   * @param userEmail - The email address of the user requesting the password reset.
   * @returns An object containing the status and message indicating the success of sending the verification code.
   * @throws BadRequestException if the request is invalid or the user is not found.
   */
  async forgotPassword(userEmail: string) {
    if (!userEmail || userEmail === null || userEmail === undefined) {
      return {
        status: 403,
        message: 'Invalid Request, fill all fields',
      };
    }
    try {
      const userAvailable = await this.prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!userAvailable) {
        return {
          status: 403,
          message: 'Not Found',
        };
      }

      const alreadyRequested = await this.redisClient.get(userEmail);

      if (alreadyRequested) {
        this.redisClient.del(userEmail);
      }

      const verificationCode = await this.generateVerificationCode();

      const subject = 'OTP for Password Reset';
      const text =
        'Your OTP for password reset is ' +
        verificationCode +
        '. Please enter this OTP to verify your account. And if not sent by you, please ignore this email.';

      await this.sendVerificationCode(userEmail, subject, text);

      await this.redisClient.set(userEmail, verificationCode);
      console.log(await this.redisClient.get(userEmail));
      console.log(verificationCode);

      return {
        status: 200,
        message: 'Verification Code Sent',
      };
    } catch {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Confirms the reset password for a user.
   *
   * @param userEmail - The email of the user.
   * @param dto - The reset password data transfer object.
   * @returns An object with the status and message indicating the result of the password reset.
   * @throws BadRequestException if the verification code is not found or is invalid.
   * @throws ForbiddenException if an error occurs during the password reset process.
   */
  async confirmResetPassword(userEmail: string, dto: ResetPasswordDto) {
    try {
      const verificationCode: string = await this.redisClient.get(userEmail);

      if (!verificationCode) {
        return {
          status: 404,
          message: 'Verification code not found',
        };
        // throw new BadRequestException('Not Found');
      }

      if (verificationCode == dto.code) {
        this.redisClient.del(userEmail);

        this.prisma.user.update({
          where: {
            email: userEmail,
          },
          data: {
            password: dto.newPassword,
          },
        });

        return {
          status: 200,
          message: 'Password Reset successfully',
        };
      } else {
        return {
          status: 403,
          message: 'Invalid Verification code',
        };
        // throw new BadRequestException('Invalid verification code');
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server error',
      };
    }
  }

  async changePassword(token: string, userId: string, password: string) {
    if (
      !password ||
      password === null ||
      password === undefined ||
      password.length < 8
    ) {
      return {
        status: 403,
        message: 'Password must be valid',
      };
    }
    try {
    } catch {
      return {
        status: 403,
        message: 'password must be valid',
      };
      // throw new BadRequestException('Invalid Request');÷
    }

    const userAvailable = await this.prisma.user.findUnique({
      where: {
        id: userId,
        token: token,
      },
    });

    if (!userAvailable) {
      return {
        status: 403,
        message: 'user not found',
      };
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: password,
      },
    });

    return {
      status: 200,
      message: 'Password changed successfully',
    };
  }

  /**
   * Signs in a user with the provided authentication data.
   * @param dto - The authentication data for the user.
   * @returns The signed-in user object.
   * @throws ForbiddenException if no user with the provided email is found or if the password is invalid.
   */
  // ...

  async signin(dto: LoginDto, response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
        include: {
          settings: true,
          CourseEnrollment: true,
          achievements: true,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'User not found with the given email',
        };
      }

      const isPasswordValid = await bcrypt.compare(dto.password, user.password);

      if (!isPasswordValid) {
        return {
          status: 403,
          message: 'Invalid Password',
        };
      }

      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token: string = this.jwtService.sign(payload) || '';

      // Set the access_token as a cookie
      response.cookie('access_token', access_token, { httpOnly: true });

      // Omitting the password from the result before sending it
      delete user.password;

      return {
        status: 200,
        message: 'Login Successful',
        data: user,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
}
