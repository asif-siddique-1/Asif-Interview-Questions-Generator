import { Worker } from "bullmq";
import { generateQuestions } from "../utils/generateQuestions";
import { AppError } from "../utils/AppError";
import { tryCatch } from "../utils/tryCatch";
import { connection } from "../config/redis";

new Worker(
  "question-generation",
  async (job) => {
    const { skills, numQuestions, experienceLevel, questionTypes } = job.data;

    const { data: questions, error } = await tryCatch(
      generateQuestions(skills, numQuestions, experienceLevel, questionTypes)
    );

    if (error) {
      throw new AppError(error.message, 500);
    }

    return questions;
  },
  {
    connection,
  }
);
