import {
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Errors } from '@/common/errors/errors';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // Token expiré
    if (info?.name === 'TokenExpiredError') {
      throw Errors.AuthTokenExpired();
    }

    // Token invalide
    if (info?.name === 'JsonWebTokenError') {
      throw Errors.AuthTokenInvalid();
    }

    // Pas de user → non authentifié
    if (err || !user) {
      throw Errors.AuthUnauthorized();
    }

    return user;
  }
}
