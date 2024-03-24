import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('status')
  getStatus() {
    return this.projectService.getStatus();
  }

  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get('/:projectId')
  getProject(@Param('projectId') projectId: string) {
    return this.projectService.getProject(projectId);
  }
}
