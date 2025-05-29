import React from "react";
import { FiLoader, FiAlertCircle } from "react-icons/fi";

interface QuestionFormProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  experience: string;
  setExperience: (value: string) => void;
  numQuestions: number;
  setNumQuestions: (value: number) => void;
  questionTypes: string[];
  handleQuestionTypeChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
  experienceLevels: string[];
  questionTypeOptions: { value: string; label: string }[];
  statusMessage: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  jobDescription,
  setJobDescription,
  experience,
  setExperience,
  numQuestions,
  setNumQuestions,
  questionTypes,
  handleQuestionTypeChange,
  handleSubmit,
  isLoading,
  error,
  experienceLevels,
  questionTypeOptions,
  statusMessage,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="job-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Job Description *
        </label>
        <div className="mt-1">
          <textarea
            id="job-description"
            rows={6}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-lg p-4"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Experience Level *
          </label>
          <select
            id="experience"
            className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            disabled={isLoading}
            required
          >
            <option value="">Select experience level</option>
            {experienceLevels.map((level) => (
              <option
                key={level}
                value={level.toLowerCase().replace(" ", "-")}
                className="capitalize"
              >
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Types *
          </label>
          <div className="mt-1 space-y-2">
            {questionTypeOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={questionTypes.includes(option.value)}
                  onChange={() => handleQuestionTypeChange(option.value)}
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
            {questionTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {questionTypes.map((type) => {
                  const option = questionTypeOptions.find(
                    (opt) => opt.value === type
                  );
                  return option ? (
                    <span
                      key={type}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {option.label}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="num-questions"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Questions: {numQuestions}
          </label>
          <input
            type="range"
            id="num-questions"
            min="1"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={isLoading}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              {statusMessage}
            </>
          ) : (
            "Generate Questions"
          )}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
