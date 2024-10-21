import { Get, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CHATGPT_KEY } from '../../config';
import { max } from 'rxjs';
import { Message } from 'openai/resources/beta/threads/messages';
interface OpenAIReply {
   choices: [
      {
         message: {
            role: string,
            content: string
         }
      }
   ]
}
 
@Injectable()
export class EvaService {
    
   openai = new OpenAI({apiKey: CHATGPT_KEY});



   async getReply(context: Array<any>, temperature: number, max_tokens: number){
      try{ 
         const reply = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature:temperature,
            max_tokens: max_tokens,
            messages: context
         })
         return reply.choices[0].message;
      } catch(err){
         console.log(err);
         throw err;
      }
   }
   

}
