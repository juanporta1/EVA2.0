import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from '../app.service';
import { EvaService } from '../services/eva/eva.service';
import { text } from 'stream/consumers';
import { assert } from 'console';
import { Readable } from 'stream';


@Controller('eva')
export class EvaController {

    constructor(private readonly appService: AppService, private eva: EvaService){}
    context = [{role: "system", content: "Eres Eva de la pelicula Wall-E"}]


    @Get("prompt")
    async getReply(@Query("prompt") prompt: string){
        this.context.push({role: "user", content: prompt})
        const reply = await this.eva.getReply(this.context, 1, 1000)
        const onlyReply: string = reply.content
        this.context.push({role: "assistant", content: onlyReply})
        await this.eva.getSpeechVar(onlyReply);
        console.log(this.context)
        return onlyReply;
        };
    }
