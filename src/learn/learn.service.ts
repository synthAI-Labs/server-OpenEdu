import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Service responsible for handling learn-related operations.
 */
@Injectable()
export class LearnService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves the status of the authentication service.
   * @returns A string indicating the status of the authentication service.
   */
  getStatus() {
    return 'Auth service is up';
  }

  /**
   * Validates the format of an ID.
   * @param id - The ID to validate.
   * @param field - The field name associated with the ID.
   * @returns The parsed ID as a number.
   * @throws ForbiddenException if the ID format is invalid.
   */
  private validateIdFormat(id: string, field: string): number {
    const parsedId = parseInt(id);
    console.log(parsedId);
    if (isNaN(parsedId)) {
      throw new ForbiddenException(`Invalid ${field} format`);
    }
    return parsedId;
  }

  /**
   * Retrieves all learn courses.
   * @returns A promise that resolves to an array of courses.
   */
  async getLearn() {
    try {
      return {
        status: 200,
        message: 'success',
        data:  await this.prisma.course.findMany()
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: 'Internal Server Error'
      }
    }
  }

  /**
   * Retrieves a course by its ID.
   * @param courseId - The ID of the course to retrieve.
   * @returns A promise that resolves to the course.
   * @throws ForbiddenException if the course is not found.
   */
  async getCourseById(courseId: string, userId?: string) {
    try {
      let parsedUserId 
      let parsedCourseId
      try {
        parsedCourseId = this.validateIdFormat(courseId, 'course ID');
      } catch {
        return {
          status: 403, 
          message: 'Wrong Course Id Sent. Please report it to team'
        }
      }

      const course = await this.prisma.course.findUnique({
        where: { id: parsedCourseId },
        include: {
          modules: true,
        },
      });
      if (!course) {
        return {
          status: 404,
          message: 'Course not found',
        };
        // throw new ForbiddenException('Course not found');
      }

      let coursesCompleted

      if (userId != null || userId != undefined ) {
        console.log("entering...")
        parsedUserId = this.validateIdFormat(userId, 'user ID')
        coursesCompleted = await this.prisma.courseEnrollment.findMany({
          where: {
            userId: parsedUserId,
            courseId: parsedCourseId
          },
          select: {
            completedModulesId: true
          }
        })
        console.log(coursesCompleted)
      }

      return {
        status: 200,
        message: 'Success',
        data: course,
       coursesCompleted
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Enrolls a user in a course.
   * @param courseId - The ID of the course to enroll in.
   * @param userId - The ID of the user to enroll.
   * @param token - The token for user authentication.
   * @returns {NotFoundException} If the user or course is not found.
   * @returns A Promise that resolves to void.
   */
  async enroll(courseId: string, userId: string, token: string) {
    try {
      console.log(userId);
      const parsedCourseId = this.validateIdFormat(courseId, 'course ID');
      const parsedUserId = this.validateIdFormat(userId, 'user ID');

      // Check if the course exists
      const course = await this.prisma.course.findUnique({
        where: { id: parsedCourseId },
        include: {
          modules: true,
        },
      });

      if (!course) {
        return {
          status: 404,
          message: 'Course not found',
        };
      }

      // Check if the user exists and the token is valid
      const user = await this.prisma.user.findUnique({
        where: {
          id: parsedUserId,
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'User not found or invalid token',
        };
      }

      // Check if the user is already enrolled
      const alreadyEnrolled = await this.prisma.courseEnrollment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
        },
      });

      if (alreadyEnrolled) {
        return {
          status: 200,
          message: 'Already enrolled',
        };
      }

      // Calculate pending modules
      const totalModules = course.modules.length;

      // Create a new course enrollment
      await this.prisma.courseEnrollment.create({
        data: {
          userId: parseInt(userId),
          courseId: parseInt(courseId),
          name: course.name,
          description: course.description,
          image: course.image,
          totalModules: totalModules,
        },
      });

      return {
        status: 201,
        message: 'Enrolled Successfully',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Retrieves a module of a course.
   * @param moduleId - The ID of the module.
   * @returns A promise that resolves to the module.
   * @throws ForbiddenException if the module is not found.
   */
  async getModule(moduleId: string) {
    try {
      const parsedModuleId = this.validateIdFormat(moduleId, 'module ID');

      const module = await this.prisma.module.findUnique({
        where: { id: parsedModuleId },
        include: {
          quiz: true
        }
      });

      if (!module) {
        return {
          status: 404,
          message: 'Course not found',
        };
      }

      return {
        status: 200,
        message: 'Success',
        data: module
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Completes a module of a course for a user.
   * @param moduleId - The ID of the module to complete.
   * @param userId - The ID of the user completing the module.
   * @param token - The token for user authentication.
   * @returns {NotFoundException} If the user or module is not found.
   * @returns {ForbiddenException} If the user is not enrolled in the course or the module is already completed.
   * @returns A Promise that resolves to a success message.
   */
  async completeModule(moduleId: string, userId: string, token: string) {
    try {
      const parsedModuleId = this.validateIdFormat(moduleId, 'module ID');
      const parsedUserId = this.validateIdFormat(userId, 'user ID');

      const user = await this.prisma.user.findUnique({
        where: {
          id: parsedUserId,
          token: token,
        },
      });

      if (!user) {
        return {
          status: 403,
          message: 'User not found',
        };
      }

      const module = await this.prisma.module.findUnique({
        where: {
          id: parsedModuleId,
        },
      });

      if (!module) {
        return {
          status: 403,
          message: 'Module not found',
        };
      }

      // Check if the module is already completed by the user
      const enrollment = await this.prisma.courseEnrollment.findFirst({
        where: {
          userId: user.id,
          courseId: module['courseId'],
        },
      });

      if (!enrollment) {
        return {
          status: 403,
          message: 'User not enrolled in the course',
        };
      }

      if (enrollment.completedModulesId.includes(parsedModuleId)) {
        return {
          status: 200,
          message: 'Module already completed by the user',
        };
      }

      await this.prisma.courseEnrollment.update({
        where: {
          id: enrollment.id,
        },
        data: {
          completedModulesId: {
            push: parsedModuleId,
          },
          progress: enrollment.progress + 1, // Increment the progress
        },
        select: {
          completedModulesId: true,
          courseId: true,
          userId: true
        }
      });

      return {
        status: 200,
        message: 'Module completed successfully',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
}
