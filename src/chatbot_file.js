import OpenAI from "openai";
import { CHATGPT_KEY } from "../config";
import { findSourceMap } from "module";

let openai = new OpenAI({apiKey: CHATGPT_KEY});

async function getReply(context) {
    try{
        let reply = await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                temperature: 1,
                max_tokens: 1000,
                content: context
            })

            context.push()
                
        } catch(error){
            console.log("Error en el intento de respuesta de Eva: "+error);
            throw error;
        }
        
}

