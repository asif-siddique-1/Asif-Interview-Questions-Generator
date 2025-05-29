import React from "react";

interface QuestionListProps {
  questions: string[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-lg p-8 w-full mt-6 border border-white/30">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Generated Questions
      </h2>
      <ul>
        {questions.map((question, index) => (
          <li
            key={index}
            className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm border border-white/40"
          >
            <p className="text-gray-800">{question}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
