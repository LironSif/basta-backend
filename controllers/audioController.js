import fs from 'fs/promises';
import getOpenAiInstance from '../utils/openai.js';
import convertToWav from '../utils/convertToWav.js';
import { OpenAI, toFile } from "openai";

export const processAudio = async (req, res) => {
    console.log("Received request for processing audio");

    if (!req.file) {
        console.log("No audio file provided in the request");
        return res.status(400).send('No audio file provided');
    }

    try {
        console.log(`Converting file to WAV: ${req.file.path}`);
        const convertedFilePath = await convertToWav(req.file.path);
        console.log(`Conversion successful. Reading file: ${convertedFilePath}`);
        
        const buffer = await fs.readFile(convertedFilePath);
        console.log("File read into buffer");

        const openai = getOpenAiInstance();
        
        if( req.body.translate === "true"){
            const response = await transcribeWithOpenAI(buffer, true,convertedFilePath)
            const result = await promptOpenAi(response)
            return res.send(result)
        }
           

        console.log("Audio processing with OpenAI completed");
        const transcription = await openai.audio.transcriptions.create({
            model: "whisper-1",
            file: await toFile(buffer, convertedFilePath),
          });

        await fs.unlink(convertedFilePath); // Cleanup the temporary file
        console.log("Temporary file cleaned up");
        const result = await promptOpenAi(transcription.text)
           res.send(result);
        
    } catch (error) {
        console.error("Error during audio processing: ", error);
        res.status(500).send(`Error processing audio file: ${error.message}`);
    }
};

const transcribeWithOpenAI = async (buffer, isTranslate,convertedFilePath) => {
    console.log(`Starting OpenAI ${isTranslate ? 'translation' : 'transcription'}`);
    const openai = getOpenAiInstance();


    try {
        if (isTranslate) {
            const translation = await openai.audio.translations.create({
                model: "whisper-1",
                file:  await toFile(buffer, convertedFilePath),
            });
            console.log("Translation completed");
            return translation.text ;
        } else {
            const transcription = await openai.audio.transcriptions.create({
                model: "whisper-1",
                file: await toFile(buffer, convertedFilePath),
            });
            console.log("Transcription completed");
            return  transcription.text ;
        }
    } catch (error) {
        console.error(`Error during OpenAI ${isTranslate ? 'translation' : 'transcription'}: `, error);
        throw error;
    }
};

const promptOpenAi = async (prompt)=> {
    const openai = getOpenAiInstance();
    try {
        console.log(prompt);
        const systemMessage = {
            role: "system",
            content: `You are a helpful assistant. Your task is to organize provided information about a basta (market stand) into a specific format and ensure the basta name always includes 'basta' not 'pasta'. Each item should also have a placeholder URL for an image. The format should be: 
            {
              "basta name": "[basta name]",
              "items": [
                {
                  "item": "[item name]",
                  "price": "[price] ILS",
                  "unit": "[unit]",
                  "image": "URL placeholder for [item name]"
                },
                ...
              ]
            }.`,
        };
        
        
            const response = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                  systemMessage,
                  { role: "user", content: prompt },
              ],
              max_tokens: 250,
              // temperature: 1,
              // stop: ":",
              // presence_penalty: 2,
              // seed: 42,
              // n: 2,
            });
            const assistantResponse = response.choices[0].message;
        console.log("##########################################",assistantResponse.content);
            return assistantResponse.content;
          
        
    
} catch(error){
    console.log(error.message);
}
}