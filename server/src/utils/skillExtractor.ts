import { openai } from "../config/openAI";
import { AppError } from "./AppError";
import { tryCatch } from "./tryCatch";
import { extractSkillsPrompt } from "./prompts/extractSkillsPrompt";
import config from "../config/config";

/**
 * Extracts technical skills from a job description using an external AI-powered skill extraction API.
 * @param jobDescription The job description text.
 * @returns A Promise that resolves to an array of extracted skill strings.
 */
export const skillExtractor = async (
  jobDescription: string
): Promise<string[]> => {
  if (!config.openAiApiKey) {
    return ["react", "python", "nodejs"];
  }
  const { data, error } = await tryCatch(
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: extractSkillsPrompt(jobDescription) },
      ],
    })
  );

  if (error) {
    throw new AppError(error.message, 500);
  }

  const skillsText = data.choices[0].message.content || "";

  if (!skillsText) {
    throw new AppError("Failed to extract skills", 500);
  }

  return skillsText
    .split(",")
    .map((skill: string) => skill.trim())
    .filter(Boolean);
};
