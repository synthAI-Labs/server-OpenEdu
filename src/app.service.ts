import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

/**
 * Service class for the application.
 */
@Injectable()
export class AppService {
  constructor(private http: HttpHealthIndicator) {}

  /**
   * Returns a greeting message.
   * @returns The greeting message.
   */
  getHello() {
    return 'Hello World!';
  }

  /**
   * Performs a health check on the specified services.
   * @returns A promise that resolves to an object containing the status and details of the services.
   */
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
