import React, { useState, useRef } from "react";
import QuestionForm from "../components/QuestionsPage/QuestionForm";
import GeneratedQuestions from "../components/QuestionsPage/GeneratedQuestions";
import { generateQuestions } from "../services/questionService";
import { downloadQuestions } from "../utils/download";
import type { Question } from "../types";

const GeneratePage: React.FC = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const experienceLevels = [
    "junior",
    "mid-level",
    "senior",
    "lead",
    "principal",
  ];

  const questionTypeOptions = [
    { value: "theoretical", label: "Theoretical" },
    { value: "coding", label: "Coding" },
    { value: "system-design", label: "System Design" },
  ];

  const [jobId, setJobId] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState("Generating questions...");

  const handleQuestionTypeChange = (value: string) => {
    setQuestionTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription.trim() || !experience || questionTypes.length === 0) {
      setError("Please fill in all required fields");
      return;
    }

    generateQuestions(
      jobDescription,
      experience,
      numQuestions,
      questionTypes,
      setJobId,
      setQuestions,
      setIsComplete,
      setStatusMessage,
      setError,
      setIsLoading
    );
  };

  const handleGenerateNew = () => {
    setQuestions([]);
    setIsComplete(false);
    setJobDescription("");
    setExperience("");
  };

  const questionsRef = useRef<HTMLDivElement>(null);

  const downloadQuestionsHandler = async (format: "json" | "pdf") => {
    downloadQuestions(questions, questionsRef, format);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Generate Interview Questions
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Get tailored interview questions based on your job description
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            {!isComplete ? (
              <QuestionForm
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                experience={experience}
                setExperience={setExperience}
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
                questionTypes={questionTypes}
                handleQuestionTypeChange={handleQuestionTypeChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
                experienceLevels={experienceLevels}
                questionTypeOptions={questionTypeOptions}
                statusMessage={statusMessage}
              />
            ) : (
              <GeneratedQuestions
                questions={questions}
                questionsRef={questionsRef}
                handleGenerateNew={handleGenerateNew}
                downloadQuestions={downloadQuestionsHandler}
                experience={experience}
                questionTypes={questionTypes}
                questionTypeOptions={questionTypeOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
