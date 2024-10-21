import { Get, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CHATGPT_KEY } from '../../config';

@Injectable()
export class EvaService {
    
   openai = new OpenAI({apiKey: CHATGPT_KEY});

   


}
