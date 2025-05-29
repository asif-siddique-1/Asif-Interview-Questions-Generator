import type { ApiResponse, Question } from "../types";
import {
  API_BASE_URL,
  QUESTIONS_GENERATE_ENDPOINT,
  QUESTIONS_STATUS_ENDPOINT,
} from "../utils/constants";

const POLLING_INTERVAL = 2000; // 2 seconds
const MAX_POLLING_ATTEMPTS = 30; // Max 1 minute of polling

export const pollJobStatus = async (
  jobId: string,
  setQuestions: (questions: Question[]) => void,
  setIsComplete: (isComplete: boolean) => void,
  setStatusMessage: (message: string) => void,
  setError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  attempt = 0
) => {
  if (attempt >= MAX_POLLING_ATTEMPTS) {
    setError("Generation is taking longer than expected. Please try again.");
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${QUESTIONS_STATUS_ENDPOINT}/${jobId}`
    );
    const data: ApiResponse = await response.json();

    if (data.status === "completed" && data.result) {
      setQuestions(data.result);
      setIsComplete(true);
      setStatusMessage("Questions generated successfully!");
      setIsLoading(false); // Ensure loading is set to false on completion
    } else if (data.status === "active" || data.status === "waiting") {
      setStatusMessage(
        `Processing... (${attempt + 1}/${MAX_POLLING_ATTEMPTS})`
      );
      // Continue polling
      setTimeout(
        () =>
          pollJobStatus(
            jobId,
            setQuestions,
            setIsComplete,
            setStatusMessage,
            setError,
            setIsLoading,
            attempt + 1
          ),
        POLLING_INTERVAL
      );
    } else {
      throw new Error(data.message || "Failed to generate questions");
    }
  } catch (err: unknown) {
    console.error("Polling error:", err);
    if (err instanceof Error) {
      setError(
        "Failed to check generation status. Please try again." + err.message
      );
    } else {
      setError("Failed to check generation status. Please try aagain.");
    }
    setIsLoading(false);
  }
};

export const generateQuestions = async (
  jobDescription: string,
  experienceLevel: string,
  numQuestions: number,
  questionTypes: string[],
  setJobId: (jobId: string) => void,
  setQuestions: (questions: Question[]) => void,
  setIsComplete: (isComplete: boolean) => void,
  setStatusMessage: (message: string) => void,
  setError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true);
  setError("");
  setStatusMessage("Starting question generation...");

  try {
    const response = await fetch(
      `${API_BASE_URL}${QUESTIONS_GENERATE_ENDPOINT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          experienceLevel,
          numQuestions,
          questionTypes, // This will be an array of selected types
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to start question generation: ${response.statusText}`
      );
    }

    const data: ApiResponse = await response.json();

    if (data.jobId) {
      setJobId(data.jobId);
      setStatusMessage("Generating questions...");
      // Start polling
      setTimeout(
        () =>
          pollJobStatus(
            data.jobId!,
            setQuestions,
            setIsComplete,
            setStatusMessage,
            setError,
            setIsLoading
          ),
        1000
      );
    } else {
      throw new Error(data.message || "Invalid response from server");
    }
  } catch (err: unknown) {
    console.error("Generation error:", err);
    if (err instanceof Error) {
      setError("Failed to generate questions. Please try again." + err.message);
    } else {
      setError("Failed to generate questions. Please try again.");
    }
    setIsLoading(false);
  }
};
