import { Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { tryCatch } from '../utils/tryCatch';
import { skillExtractor } from '../utils/skillExtractor';
import { generateQuestions } from '../utils/generateQuestions';
import { questionQueue } from '../jobs/questionsQueue';

export const generateQuestionsController = async (
  req: Request,
  res: Response,
) => {
  // Get Job description from request body
  const {
    jobDescription,
    experienceLevel,
    numQuestions = 3,
    questionTypes = ['Theoretical', 'Coding'],
  } = req.body as {
    jobDescription: string;
    experienceLevel: 'junior' | 'mid-level' | 'senior' | 'lead' | 'principal';
    numQuestions?: number;
    questionTypes?: string[];
  };

  if (!jobDescription || !experienceLevel) {
    throw new AppError(
      'Job description and experience level are required',
      400,
    );
  }

  const { data, error } = await tryCatch(skillExtractor(jobDescription));

  if (error) {
    throw new AppError(error.message, 500);
  }

  const job = await questionQueue.add('generate', {
    skills: data,
    numQuestions,
    experienceLevel,
    questionTypes,
  });

  res.json({ jobId: job.id, message: 'Question generation started' });
};

export const getQuestionStatusController = async (
  req: Request,
  res: Response,
) => {
  const { jobId } = req.params;

  const job = await questionQueue.getJob(jobId);

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  const state = await job.getState();
  const result = await job.returnvalue;

  if (state === 'completed') {
    res.json({ status: state, result });
    await job.remove();
  } else {
    res.json({ status: state, result: null });
  }
};
