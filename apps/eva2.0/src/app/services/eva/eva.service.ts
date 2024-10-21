import { Get, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CHATGPT_KEY } from '../../config';
import { max } from 'rxjs';
import { Message } from 'openai/resources/beta/threads/messages';
import fs from 'fs';
import { Readable } from 'stream';
import { AudioContext } from "web-audio-api";
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
   route = "./apps/eva2.0/src/audios/eva_response.mp3";
   async getSpeechVar(prompt: string){
      const speech = await this.openai.audio.speech.create({
         model: "tts-1",
         voice: "alloy",
         input: prompt
      });
      const bufferArray = Buffer.from(await speech.arrayBuffer());
      console.log(bufferArray);
      const audioContext = new AudioContext();
      audioContext.decodeAudioData(bufferArray, (buffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
      }, (error) => {
      console.error('Error al decodificar el audio:', error);
      });
   }
   

}
