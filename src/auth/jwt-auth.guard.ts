import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic to extract the access_token from the header
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['access_token'];

    // Set the access_token in the request for passport-jwt to use
    if (accessToken) {
      request.headers.authorization = `${accessToken}`;
    }

    return super.canActivate(context);
  }
}
