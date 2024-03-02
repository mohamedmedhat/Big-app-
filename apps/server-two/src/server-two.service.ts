import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerTwoService {
  getHello(): string {
    return 'Hello World!';
  }
}
