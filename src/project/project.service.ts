import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the status of the project service.
   * @returns An object containing the status and message.
   */
  getStatus() {
    return {
      status: '200 OK',
      message: 'Project Service is up and running!',
    };
  }

  /**
   * Retrieves all projects from the database.
   * @returns {Promise<{ status: number, message: string, data?: any[] }>} The response object containing the status, message, and data (if available).
   * - status: The HTTP status code.
   * - message: The status message.
   * - data: An array of projects.
   */
  async getAllProjects() {
    try {
      const appProjects = await this.prisma.projects.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          createdDate: true,
          Githublink: true,
          isLink: false,
          content: false,
          tags: true,
        },
      });

      return {
        status: 200,
        message: 'Success',
        data: appProjects,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  /**
   * Retrieves a project by its ID.
   * @param projectId - The ID of the project to retrieve.
   * @returns An object containing the status and message.
   *          If the project ID is empty or invalid, the status will be 403 and the message will indicate the issue.
   *          If there is an internal server error, the status will be 500 and the message will indicate the error.
   */
  async getProject(projectId: string) {
    if (projectId == null || projectId == undefined) {
      return {
        status: 403,
        message: 'Empty or invalid project id',
      };
    }
    try {
      const project = await this.prisma.projects.findUnique({
        where: {
          id: parseInt(projectId),
        },
      });

      return {
        status: 200,
        message: 'Success',
        data: project,
      }
    } catch (e) {
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
}
