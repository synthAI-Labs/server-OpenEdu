import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Service responsible for handling learn-related operations.
 */
@Injectable()
export class LearnService {
  constructor(private prisma: PrismaService) { }

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
    return this.prisma.course.findMany();
  }

  /**
   * Retrieves a course by its ID.
   * @param courseId - The ID of the course to retrieve.
   * @returns A promise that resolves to the course.
   * @throws ForbiddenException if the course is not found.
   */
  async getCourseById(courseId: string) {
    const parsedCourseId = this.validateIdFormat(courseId, 'course ID');

    const course = await this.prisma.course.findUnique({
      where: { id: parsedCourseId },
    });

    if (!course) {
      throw new ForbiddenException('Course not found');
    }

    return course;
  }

  /**
   * Enrolls a user in a course.
   * @param courseId - The ID of the course to enroll in.
   * @param userId - The ID of the user to enroll.
   * @param token - The token for user authentication.
   * @throws {NotFoundException} If the user or course is not found.
   * @returns A Promise that resolves to void.
   */
  async enroll(courseId: string, userId: string, token: string): Promise<string> {
    const parsedCourseId = this.validateIdFormat(courseId, 'course ID');

    const course = await this.prisma.course.findUnique({
      where: { id: parsedCourseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(userId),
        token: token
      },
    });

    if (!user) {
      throw new NotFoundException('User not found or invalid token');
    }

    const alreadyEnrolled = await this.prisma.courseEnrollment.findFirst({
      where: {
        userId: user.id,
        courseId: course.id,
      },
    });

    if (alreadyEnrolled) {
      return "Already enrolled";
    }

    const enrollment = await this.prisma.courseEnrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
        status: 'NOT_STARTED',
      },
    });

    const updateduser = await this.prisma.user.update({
      where: { id: user.id },
      data: { CourseEnrollment: { connect: { id: enrollment.id } } },
    });

    return "Enrolled";
  }

  /**
   * Retrieves the topics of a course.
   * @param courseId - The ID of the course.
   * @returns A promise that resolves to an array of topics.
   * @throws ForbiddenException if the course is not found.
   */
  async getTopics(courseId: string) {
    const parsedCourseId = this.validateIdFormat(courseId, 'course ID');

    const course = await this.prisma.course.findUnique({
      where: { id: parsedCourseId },
      include: {
        subtopics: {
          include: {
            modules: true,
          },
        },
      },
    });

    if (!course) {
      throw new ForbiddenException('Course not found');
    }

    return course.subtopics;
  }

  /**
   * Retrieves a module of a course.
   * @param courseId - The ID of the course.
   * @param topicId - The ID of the topic.
   * @param moduleId - The ID of the module.
   * @returns A promise that resolves to the module.
   * @throws ForbiddenException if the course, topic, or module is not found.
   */
  async getModule(courseId: string, topicId: string, moduleId: string) {
    const parsedCourseId = this.validateIdFormat(courseId, 'course ID');
    const parsedTopicId = this.validateIdFormat(topicId, 'topic ID');
    const parsedModuleId = this.validateIdFormat(moduleId, 'module ID');

    const course = await this.prisma.course.findUnique({
      where: { id: parsedCourseId },
      include: {
        subtopics: {
          include: {
            modules: true,
          },
        },
      },
    });

    if (!course) {
      throw new ForbiddenException('Course not found');
    }

    const topic = course.subtopics.find((t) => t.id === parsedTopicId);

    if (!topic) {
      throw new ForbiddenException('Topic not found');
    }

    const module = topic.modules.find((m) => m.id === parsedModuleId);

    if (!module) {
      throw new ForbiddenException('Module not found');
    }

    return module;
  }
}
