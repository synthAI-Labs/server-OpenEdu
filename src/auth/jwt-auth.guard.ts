// jwt-auth.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      request.user = decodedToken; // Attach the decoded token to the request for later use
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  private extractTokenFromHeader(
    authorizationHeader: string | undefined,
  ): string | null {
    if (!authorizationHeader) {
      return null;
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }
}
