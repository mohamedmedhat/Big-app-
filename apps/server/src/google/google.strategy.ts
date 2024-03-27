import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly _config: ConfigService) {
    super({
      clientID: _config.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: _config.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: _config.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: any,
    accesstoken: string,
    refreshtoken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, email, photos } = profile;
    const user = {
      email: email[0].value,
      firstName: name.giveName,
      lastName: name.familyName,
      picture: photos[0].value,
      accesstoken,
    };
    done(null, user);
  }
}
