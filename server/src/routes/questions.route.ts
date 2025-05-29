import express from 'express';
import { generateQuestionsController } from '../controllers/questions.controller';
import { validate } from '../middleware/schemaValidator';
import { generateQuestionsSchema } from '../validations/generateQuestions';
import { getQuestionStatusController } from '../controllers/questions.controller';

const router = express.Router();

router.post(
  '/generate',
  validate(generateQuestionsSchema),
  generateQuestionsController,
);

router.get('/status/:jobId', getQuestionStatusController);

export default router;
