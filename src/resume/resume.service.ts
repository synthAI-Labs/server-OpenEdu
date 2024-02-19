import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  EducationDto,
  ExperienceDto,
  ProjectsDto,
  SkillsDto,
} from './dto/education.dto';

/**
 * Service class for the application.
 */
@Injectable()
export class ResumeService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns a greeting message.
   * @returns The greeting message.
   */
  getHello() {
    return 'Hello World!';
  }

  /* changing FIELD
  _______________________
  |                     |
  |    EDUCATION FIELD  |
  |                     |
  |---------------------|

  */

  async addEducation(token: string, userId: string, dto: EducationDto) {
    if (
      parseInt(userId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      const education = await this.prisma.education.create({
        data: {
          userId: parseInt(userId),
          school: dto.school,
          description: dto.description,
          degree: dto.degree,
          field: dto.field,
          startDate: dto.startDate,
          endDate: dto.endDate,
        },
      });

      return education;
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error: ${error}`,
      };
    }
  }

  async UpdateEducation(
    token: string,
    userId: string,
    educationId: string,
    dto: EducationDto,
  ) {
    if (
      parseInt(userId) < 0 ||
      parseInt(educationId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      educationId === null ||
      educationId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      let UpdateEducation;
      try {
        UpdateEducation = await this.prisma.education.update({
          where: {
            userId: parseInt(userId),
            id: parseInt(educationId),
          },
          data: {
            school: dto.school,
            degree: dto.degree,
            field: dto.field,
            startDate: dto.startDate,
            endDate: dto.endDate,
            description: dto.description,
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `invalid education ID`,
        };
      }

      return UpdateEducation;
    } catch (error) {
      return {
        status: 500,
        message: `Internal server error. ${error}`,
      };
    }
  }

  async DeleteEducation(token: string, userId: string, educationId: string) {
    if (
      parseInt(userId) < 0 ||
      parseInt(educationId) < 0 ||
      !token ||
      userId === null ||
      userId === undefined ||
      educationId === null ||
      educationId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      try {
        await this.prisma.education.delete({
          where: {
            id: parseInt(educationId),
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `invalid education ID`,
        };
      }

      return {
        status: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error. ${error}`,
      };
    }
  }

  /* changing FIELD
  _______________________
  |                     |
  |   Experience FIELD  |
  |                     |
  |---------------------|

  */

  async addExperience(token: string, userId: string, dto: ExperienceDto) {
    if (
      parseInt(userId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      await this.prisma.experience.create({
        data: {
          userId: parseInt(userId),
          company: dto.company,
          description: dto.description,
          position: dto.position,
          startDate: dto.startDate,
          endDate: dto.endDate,
        },
      });
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error: ${error}`,
      };
    }
  }

  async UpdateExperience(
    token: string,
    userId: string,
    experienceId: string,
    dto: ExperienceDto,
  ) {
    if (
      parseInt(userId) < 0 ||
      parseInt(experienceId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      experienceId === null ||
      experienceId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      let UpdateExperience;
      try {
        UpdateExperience = await this.prisma.experience.update({
          where: {
            userId: parseInt(userId),
            id: parseInt(experienceId),
          },
          data: {
            company: dto.company,
            position: dto.position,
            startDate: dto.startDate,
            endDate: dto.endDate,
            description: dto.description,
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `invalid education ID`,
        };
      }

      return UpdateExperience;
    } catch (error) {
      return {
        status: 500,
        message: `Internal server error. ${error}`,
      };
    }
  }

  async DeleteExperience(token: string, userId: string, experienceId: string) {
    if (
      parseInt(userId) < 0 ||
      parseInt(experienceId) < 0 ||
      !token ||
      userId === null ||
      userId === undefined ||
      experienceId === null ||
      experienceId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      try {
        await this.prisma.experience.delete({
          where: {
            id: parseInt(experienceId),
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `invalid experience ID`,
        };
      }

      return {
        status: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error. ${error}`,
      };
    }
  }

  /* changing FIELD
  _______________________
  |                     |
  |   Project FIELD     |
  |                     |
  |---------------------|
  
  */

  async addProject(token: string, userId: string, dto: ProjectsDto) {
    if (
      parseInt(userId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      await this.prisma.userProjects.create({
        data: {
          userId: parseInt(userId),
          name: dto.name,
          description: dto.description,
          DeployedLink: dto.DeployedLink,
          Githublink: dto.Githublink,
          startDate: dto.startDate,
          endDate: dto.endDate,
        },
      });
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error: ${error}`,
      };
    }
  }

  async UpdateProject(
    token: string,
    userId: string,
    projectId: string,
    dto: ProjectsDto,
  ) {
    if (
      parseInt(userId) < 0 ||
      parseInt(projectId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      projectId === null ||
      projectId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      let UpdateProject;
      try {
        UpdateProject = await this.prisma.userProjects.update({
          where: {
            userId: parseInt(userId),
            id: parseInt(projectId),
          },
          data: {
            name: dto.name,
            DeployedLink: dto.DeployedLink,
            Githublink: dto.Githublink,
            startDate: dto.startDate,
            endDate: dto.endDate,
            description: dto.description,
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `invalid education ID`,
        };
      }

      return UpdateProject;
    } catch (error) {
      return {
        status: 500,
        message: `Internal server error. ${error}`,
      };
    }
  }

  async DeleteProject(token: string, userId: string, projectId: string) {
    if (
      parseInt(userId) < 0 ||
      parseInt(projectId) < 0 ||
      !token ||
      userId === null ||
      userId === undefined ||
      projectId === null ||
      projectId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      try {
        await this.prisma.projects.delete({
          where: {
            id: parseInt(projectId),
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `invalid project ID`,
        };
      }

      return {
        status: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error. ${error}`,
      };
    }
  }

  /* changing FIELD
  _______________________
  |                     |
  |    Skills FIELD     |
  |                     |
  |---------------------|
  
  */

  async addSkill(token: string, userId: string, dto: SkillsDto) {
    if (
      parseInt(userId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      await this.prisma.skills.create({
        data: {
          userId: parseInt(userId),
          name: dto.name,
          level: dto.level,
        },
      });
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error: ${error}`,
      };
    }
  }

  async UpdateSkill(
    token: string,
    userId: string,
    skillId: string,
    dto: SkillsDto,
  ) {
    if (
      parseInt(userId) < 0 ||
      parseInt(skillId) < 0 ||
      !token ||
      !dto ||
      userId === null ||
      userId === undefined ||
      skillId === null ||
      skillId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      let UpdateSkill;
      try {
        UpdateSkill = await this.prisma.skills.update({
          where: {
            id: parseInt(skillId),
          },
          data: {
            userId: parseInt(userId),
            name: dto.name,
            level: dto.level,
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `Skill with SkillId: ${skillId} no found`,
        };
      }

      return UpdateSkill;
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error: ${error}`,
      };
    }
  }

  async DeleteSkill(token: string, userId: string, skillId: string) {
    if (
      parseInt(userId) < 0 ||
      parseInt(skillId) < 0 ||
      !token ||
      userId === null ||
      userId === undefined ||
      skillId === null ||
      skillId === undefined ||
      token === null ||
      token === undefined
    )
      return { status: 500, message: 'Invalid request. Got undefined values' };
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId),
          token: token,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'user Not found',
        };
      }

      try {
        await this.prisma.skills.delete({
          where: {
            id: parseInt(skillId),
          },
        });
      } catch (error) {
        return {
          status: 404,
          message: `invalid experience ID`,
        };
      }

      return {
        status: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        status: 500,
        message: `Internal Server Error. ${error}`,
      };
    }
  }
}
