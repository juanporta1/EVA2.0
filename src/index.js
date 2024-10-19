
/*Paquete utilizados:*/ 
import readline from "readline";
import {OpenAI} from "openai";
import {CHATGPT_KEY} from "../config.js";
/* Constantes:*/
const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const openai = new OpenAI({apiKey:CHATGPT_KEY});

/*Programa*/


let prompt;
await input.question("Ingrese el prompt: ", put => {
    prompt = put
});

let replay = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    max_tokens: 200,
    messages: [{
        role: "user",
        content: prompt
    }]
})

console.log(completion.choices[0].message);


