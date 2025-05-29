import React, { useState } from "react";

interface QuestionFormProps {
  onSubmit: (formData: {
    jobDescription: string;
    experienceLevel: string;
    numberOfQuestions: number;
  }) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      jobDescription,
      experienceLevel,
      numberOfQuestions,
    });
  };

  return (
    <div className="backdrop-blur-md bg-white/60 rounded-2xl shadow-xl p-8 w-full mb-6 border border-white/30">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobDescription"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            rows={6}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline backdrop-blur-sm bg-white/50 border-white/30"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="experienceLevel"
          >
            Experience Level
          </label>
          <select
            id="experienceLevel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline backdrop-blur-sm bg-white/50 border-white/30"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            required
          >
            <option value="">Select Level</option>
            <option value="intern">Intern</option>
            <option value="junior">Junior</option>
            <option value="mid-level">Mid-Level</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="numberOfQuestions"
          >
            Number of Questions
          </label>
          <input
            id="numberOfQuestions"
            type="number"
            min="1"
            max="20"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline backdrop-blur-sm bg-white/50 border-white/30"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
          >
            Generate Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
