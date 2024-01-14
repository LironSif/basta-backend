import fs from 'fs/promises';
import getOpenAiInstance from '../utils/openai.js';
import convertToWav from '../utils/convertToWav.js';

export const processAudio = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No audio file provided');
    }

    try {
        const convertedFilePath = await convertToWav(req.file.path);
        const buffer = await fs.readFile(convertedFilePath);
        const openai = getOpenAiInstance();

        const response = req.body.translate === "true"
            ? await transcribeWithOpenAI(buffer, true)
            : await transcribeWithOpenAI(buffer, false);

        await fs.unlink(convertedFilePath); // Cleanup the temporary file

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error processing audio file: ${error.message}`);
    }
};

const transcribeWithOpenAI = async (buffer, isTranslate) => {
    const openai = getOpenAiInstance();

    try {
        if (isTranslate) {
            const translation = await openai.audio.translations.create({
                model: "whisper-1",
                file: buffer,
            });
            return { translation: translation.text };
        } else {
            const transcription = await openai.audio.transcriptions.create({
                model: "whisper-1",
                file: buffer,
            });
            return { transcription: transcription.text };
        }
    } catch (error) {
        throw new Error(`Failed to process audio: ${error.message}`);
    }
};
