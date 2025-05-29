import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import LoadingIndicator from "./LoadingIndicator";
import QuestionList from "./QuestionList";

const DemoSection: React.FC = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: {
    jobDescription: string;
    experienceLevel: string;
    numberOfQuestions: number;
  }) => {
    setIsLoading(true);
    setJobId(null); // Clear previous jobId
    setQuestions([]); // Clear previous questions

    try {
      const response = await fetch("/api/v1/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setJobId(data.jobId);

      // Start polling
      pollForQuestions(data.jobId);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
      // TODO: Show error message to user
    }
  };

  const pollForQuestions = async (id: string) => {
    let pollingInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/v1/questions/${id}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.status === "completed") {
          clearInterval(pollingInterval);
          setQuestions(data.questions);
          setIsLoading(false);
        } else if (data.status === "failed") {
          clearInterval(pollingInterval);
          console.error("Question generation failed:", data.error);
          setIsLoading(false);
          // TODO: Show error message to user
        }
      } catch (error) {
        console.error("Error polling for questions:", error);
        clearInterval(pollingInterval);
        setIsLoading(false);
        // TODO: Show error message to user
      }
    }, 3000); // Poll every 3 seconds
  };

  return (
    <section
      id="demo"
      className="w-full py-20 px-4 flex flex-col items-center bg-gray-100"
    >
      <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">
        Live Demo
      </h2>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {!isLoading && questions.length === 0 && (
          <QuestionForm onSubmit={handleFormSubmit} />
        )}
        {isLoading && <LoadingIndicator />}
        {questions.length > 0 && <QuestionList questions={questions} />}
      </div>
    </section>
  );
};

export default DemoSection;
