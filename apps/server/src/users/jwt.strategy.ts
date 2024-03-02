// auth/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (!req.headers.authorization) {
      return false;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = this.authService.verifyToken(token);
      req.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
