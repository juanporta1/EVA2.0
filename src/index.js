
/*Paquete utilizados:*/ 
import readline from "readline";
import {OpenAI} from "openai";
import {CHATGPT_KEY} from "../config.js";
import { resolve } from "path";
/* Constantes:*/
const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const openai = new OpenAI({apiKey:CHATGPT_KEY});

/*Programa*/



function getPrompt()
{
    
    return new Promise((resolve) => {
        input.question("Ingrese el prompt: ", put => {
            resolve(put);
        });
    })
}

async function questionsToAI(configuration, temperature, max_tokens) {
    return async function (prompt) {
        try {
            const reply = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: temperature,
                max_tokens: max_tokens,
                messages: [
                    configuration,
                    { role: "user", content: prompt }
                ]
            });
            return reply.choices[0].message; // Accede al contenido del mensaje
        } catch (error) {
            console.error("Error en la llamada a OpenAI:", error);
            throw error; // Lanza el error para manejarlo en el bloque try-catch de main
        }
    }
}

async function main() {
    const Eva = await questionsToAI({role: "system",content: "Eres Eva de Wall-E, y debes responder como tal."}, 1, 750);
    const detectGreet = await questionsToAI({role: "system",content:"Eres un modelo diseñado para clasificar mensajes en función de si son despedidas o no. Si el mensaje expresa una despedida, como 'adiós', 'nos vemos', 'hasta luego', 'cuídate', 'hasta pronto', o cualquier otra forma de despedida común, responde con '1'. Si el mensaje no representa una despedida, responde únicamente con '0'. No des ninguna explicación adicional ni otro tipo de respuesta. Solo responde con '1' o '0' según corresponda."}, 0, 1);

    let context = []

    try {
        while (true) {
            let prompt = await getPrompt();
            context.push({role: "user", content: prompt});
            
            let [isGreeting] = await Promise.all([detectGreet(prompt)]);
            console.log(isGreeting);
            let reply = await Eva(context);
            context.push({role: "assistant", content: reply.content});
            console.log(reply.content);
            if (isGreeting.content === "1") {
                break;
            }
        }
    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        input.close();
        console.log("Programa finalizado.");
    }
}

main();