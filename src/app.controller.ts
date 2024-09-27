import { Controller, Head } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Head('ping')
  ping(): void {}
}
