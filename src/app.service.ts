import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello World!';
  }
  constructor(private http: HttpHealthIndicator) {}

  @HealthCheck()
  async checkHealth(): Promise<{
    status: string;
    services: { name: string; status: any; message: any }[];
  }> {
    const services = [
      { name: 'auth', url: 'http://localhost:3001/auth/status' },
      { name: 'dashboard', url: 'http://localhost:3001/dashboard/status' },
      { name: 'learn', url: 'http://localhost:3001/learn/courses/status' },
    ];

    const results = await Promise.all(
      services.map(async ({ name, url }) => {
        try {
          const result = await this.http.pingCheck(name, url);
          return {
            name,
            status: result.status,
            message: result.error?.response?.data?.message,
          };
        } catch (error) {
          return { name, status: 'down', message: error.message };
        }
      }),
    );

    return { status: 'success', services: results };
  }
}
