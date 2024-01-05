import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { ContactDto } from './contact.dto';
import sendEmail from './email/email';

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
      { name: 'auth', url: 'http://localhost:4000/auth/status' },
      { name: 'dashboard', url: 'http://localhost:4000/dashboard/status' },
      { name: 'learn', url: 'http://localhost:4000/learn/courses/status' },
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

  async contact(body: ContactDto) {
    if (
      body.name === undefined ||
      body.email === undefined ||
      body.message === undefined
    ) {
      throw new BadRequestException('Please fill out all fields');
    }

    const status = {
      status: 200,
      message: 'Thank you for contacting us!\nWe will get back to you soon',
    };

    const email = body.email;
    const ccAddress = process.env.EMAIL_ADDRESS;
    const subject = 'Support Ticket @OpenEdu';
    const text = `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; margin-bottom: 10px;">Hi ${body.name},</p>
      <p style="font-size: 16px; margin-bottom: 20px;">We have registered your query. Here's an overview of it:</p>
  
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 10px;"><strong>Name:</strong> ${body.name}</li>
        <li style="margin-bottom: 10px;"><strong>Email:</strong> ${body.email}</li>
        <li style="margin-bottom: 10px;"><strong>Message:</strong> ${body.message}</li>
      </ul>
      <p style="font-size: 16px; margin-top: 20px;">Thank you for contacting us! <br>
      Regards,<br>
     OpenEdu Team</p>
    </div>
  </body>
  `;

    const emailStatus = await sendEmail(email, subject, text, ccAddress);

    if (!emailStatus) {
      status.status = 500;
      status.message = 'Error sending email';
      return status;
    }

    return status;
  }
}
