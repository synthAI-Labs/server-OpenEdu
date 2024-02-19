import { Controller, Get } from '@nestjs/common';
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
        return this.projectService.getAllProjects()
    }
}
