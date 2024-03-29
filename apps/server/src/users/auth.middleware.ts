import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRoles } from '../enums/userRole.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _config: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded: any = jwt.verify(
          token,
          this._config.getOrThrow<string>('JWT_SECRET'),
        );
        req['user'] = decoded;
        // Check if user has required role
        if (req.route.path === '/admin' && decoded.role !== UserRoles.ADMIN) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      return res.status(401).json({ message: 'Token not provided' });
    }
  }
}
