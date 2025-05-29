import { AppError } from "./AppError";
import { tryCatch } from "./tryCatch";
import { openai } from "../config/openAI";
import { genrateQuestionsPrompt } from "./prompts/generateQuestionsPrompt";

/**
 * Generates interview questions based on the provided skills, number of questions, and experience level.
 * @param skills Array of technical skills to generate questions for.
 * @param numQuestions Number of questions to generate.
 * @param experienceLevel Experience level of the candidate (junior, mid-level, senior, lead, principal).
 * @returns A Promise that resolves to an array of generated questions.
 */
export const generateQuestions = async (
  skills: string[],
  numQuestions: number,
  experienceLevel: string,
  questionTypes: string[] = ["Theoretical", "Coding"]
): Promise<string[]> => {
  if (!skills || skills.length === 0) {
    throw new AppError("Skills array is required", 400);
  }

  const { data, error } = await tryCatch(
    openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: genrateQuestionsPrompt(
            skills,
            numQuestions,
            experienceLevel,
            questionTypes
          ),
        },
      ],
    })
  );

  if (error) {
    throw new AppError(error.message, 500);
  }

  const questionsText = data.choices[0].message.content || "";

  if (!questionsText) {
    throw new AppError("Failed to generate questions", 500);
  }

  const questionsArray = JSON.parse(questionsText);
  if (!Array.isArray(questionsArray)) {
    throw new AppError("Failed to generate questions", 500);
  }
  return questionsArray;
};
