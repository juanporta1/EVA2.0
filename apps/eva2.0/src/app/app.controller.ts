import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { EvaService } from './services/eva/eva.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private eva: EvaService
  ) {}
}
 