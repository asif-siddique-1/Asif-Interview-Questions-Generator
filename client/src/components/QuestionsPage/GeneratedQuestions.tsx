import {
  FiDownload,
  FiFileText,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";

interface Question {
  skill: string;
  type: string;
  question: string;
  difficulty: string;
  evaluationCriteria: string;
  sampleInput?: string;
  expectedOutput?: string;
}

interface GeneratedQuestionsProps {
  questions: Question[];
  questionsRef: React.RefObject<HTMLDivElement | null>;
  handleGenerateNew: () => void;
  downloadQuestions: (format: "json" | "pdf") => Promise<void>;
  experience: string;
  questionTypes: string[];
  questionTypeOptions: { value: string; label: string }[];
}

const GeneratedQuestions: React.FC<GeneratedQuestionsProps> = ({
  questions,
  questionsRef,
  handleGenerateNew,
  downloadQuestions,
  experience,
  questionTypes,
  questionTypeOptions,
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiCheckCircle
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              Successfully generated {questions.length} questions for{" "}
              {experience} level position.
              <span className="block mt-1">
                Types:{" "}
                {questionTypes
                  .map(
                    (type) =>
                      questionTypeOptions.find((t) => t.value === type)?.label
                  )
                  .join(", ")}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6" ref={questionsRef}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Interview Questions
          <span className="block text-sm font-normal text-gray-500 mt-1">
            Generated on {new Date().toLocaleDateString()}
          </span>
        </h2>
        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-blue-600 font-bold">{index + 1}</span>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {q.question}
                  </h3>
                  <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        q.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : q.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {q.skill}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {q.type}
                    </span>
                  </div>
                </div>

                {q.sampleInput && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Sample Input:
                    </h4>
                    <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
                      {q.sampleInput}
                    </pre>
                  </div>
                )}

                {q.expectedOutput && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Expected Output:
                    </h4>
                    <pre className="mt-1 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
                      {q.expectedOutput}
                    </pre>
                  </div>
                )}

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Evaluation Criteria:
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {q.evaluationCriteria}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleGenerateNew}
          className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiRefreshCw className="-ml-1 mr-2 h-4 w-4" />
          Generate New Set
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => downloadQuestions("json")}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiDownload className="-ml-1 mr-2 h-4 w-4" />
            Download JSON
          </button>
          <button
            type="button"
            onClick={() => downloadQuestions("pdf")}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FiFileText className="-ml-1 mr-2 h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedQuestions;
