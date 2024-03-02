import { Controller, Get, Query } from '@nestjs/common';
import { WebScrabingService } from './web-scrabing.service';

@Controller('amazon')
export class WebScrabingController {
  constructor(private readonly webScrabingService: WebScrabingService) {}

  @Get('products')
  async getProducts(@Query('product') product: string){
    return await this.webScrabingService.getProducts(product);
  }
}
