import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory: async () => ({
        defaultStrategy: 'google',
      }),
    }),
  ],
  controllers: [GoogleController],
  providers: [GoogleService],
})
export class GoogleModule {}
