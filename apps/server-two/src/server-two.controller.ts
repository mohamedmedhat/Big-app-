import { Controller, Get } from '@nestjs/common';
import { ServerTwoService } from './server-two.service';

@Controller()
export class ServerTwoController {
  constructor(private readonly serverTwoService: ServerTwoService) {}

  @Get()
  getHello(): string {
    return this.serverTwoService.getHello();
  }
}
