import express from 'express';
import multer from 'multer';
import { processAudio } from '../controllers/audioController.js'; 

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('audio'), processAudio);

export default router;
