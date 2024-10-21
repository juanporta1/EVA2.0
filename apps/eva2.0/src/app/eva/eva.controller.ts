import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from '../app.service';
import { EvaService } from '../services/eva/eva.service';
import { text } from 'stream/consumers';

@Controller('eva')
export class EvaController {

    constructor(private readonly appService: AppService, private eva: EvaService){}

}

