import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // This is a custom type of data in Header
  @Header('Content-Type', 'text/html')
  getHello(): any {
    return {
      name: 'Ammar',
      age: '28'
    };
    // return this.appService.getHello();
  }
}
