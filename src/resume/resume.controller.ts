import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { isEmail } from 'class-validator';
import { ResumeService } from './resume.service';
import {
  EducationDto,
  ExperienceDto,
  ProjectsDto,
  SkillsDto,
} from './dto/education.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly appService: ResumeService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('addEducation')
  AddEducation(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: EducationDto,
  ) {
    return this.appService.addEducation(token, userId, dto);
  }

  @Put('updateEducation/:id')
  UpdateEducation(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') educationId: string,
    @Body() dto: EducationDto,
  ) {
    return this.appService.UpdateEducation(token, userId, educationId, dto);
  }

  @Delete('deleteEducation/:id')
  DeleteEducation(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') educationId: string,
  ) {
    return this.appService.DeleteEducation(token, userId, educationId);
  }

  @Post('addExperience')
  AddExperience(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: ExperienceDto,
  ) {
    return this.appService.addExperience(token, userId, dto);
  }

  @Post('updateExperience/:id')
  UpdateExperience(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') experienceId: string,
    @Body() dto: ExperienceDto,
  ) {
    return this.appService.UpdateExperience(token, userId, experienceId, dto);
  }

  @Delete('deleteExperience/:id')
  DeleteExperience(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') experienceId: string,
  ) {
    return this.appService.DeleteExperience(token, userId, experienceId);
  }

  @Post('addProject')
  AddProject(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: ProjectsDto,
  ) {
    return this.appService.addProject(token, userId, dto);
  }

  @Post('updateProject/:id')
  UpdateProject(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') projectId: string,
    @Body() dto: ProjectsDto,
  ) {
    return this.appService.UpdateProject(token, userId, projectId, dto);
  }

  @Delete('deleteProject/:id')
  DeleteProject(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') projectId: string,
  ) {
    return this.appService.DeleteProject(token, userId, projectId);
  }

  @Post('addSkill')
  AddSkill(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Body() dto: SkillsDto,
  ) {
    return this.appService.addSkill(token, userId, dto);
  }

  @Post('updateSkill/:id')
  UpdateSkill(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') skillId: string,
    @Body() dto: SkillsDto,
  ) {
    return this.appService.UpdateSkill(token, userId, skillId, dto);
  }

  @Delete('deleteSkill/:id')
  DeleteSkill(
    @Headers('authorization') token: string,
    @Headers('user_id') userId: string,
    @Param('id') skillId: string,
  ) {
    return this.appService.DeleteSkill(token, userId, skillId);
  }
}
