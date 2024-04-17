import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/environment-variables';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const decodedToken = jwt.decode(token);
    const user = await this.userService.findOne(+decodedToken.sub);
    if (!token && !user) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
