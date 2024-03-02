import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';
import { Response } from 'express';

@Controller('auth')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return await this.googleService.googleLogIn(req);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any, @Res() res: Response) {
    if (!req.user) {
      return res.redirect('/auth/google?error=authentication_failed');
    }
    return res.redirect('profile');
  }
}
