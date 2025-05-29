import React, { useState, useRef } from "react";
import {
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiDownload,
  FiFileText,
  FiRefreshCw,
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Question {
  skill: string;
  type: string;
  question: string;
  difficulty: string;
  evaluationCriteria: string;
  sampleInput?: string;
  expectedOutput?: string;
}

interface ApiResponse {
  status: string;
  jobId?: string;
  result?: Question[];
  message?: string;
}

const POLLING_INTERVAL = 2000; // 2 seconds
const MAX_POLLING_ATTEMPTS = 30; // Max 1 minute of polling

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
  const [pollingCount, setPollingCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Generating questions...");

  const pollJobStatus = async (jobId: string, attempt = 0) => {
    if (attempt >= MAX_POLLING_ATTEMPTS) {
      setError("Generation is taking longer than expected. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/questions/status/${jobId}`
      );
      const data: ApiResponse = await response.json();

      if (data.status === "completed" && data.result) {
        setQuestions(data.result);
        setIsComplete(true);
        setStatusMessage("Questions generated successfully!");
      } else if (data.status === "active") {
        setStatusMessage(
          `Processing... (${attempt + 1}/${MAX_POLLING_ATTEMPTS})`
        );
        // Continue polling
        setTimeout(() => pollJobStatus(jobId, attempt + 1), POLLING_INTERVAL);
      } else {
        throw new Error(data.message || "Failed to generate questions");
      }
    } catch (err) {
      console.error("Polling error:", err);
      setError("Failed to check generation status. Please try again.");
      setIsLoading(false);
    }
  };

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

    setIsLoading(true);
    setError("");
    setQuestions([]);
    setIsComplete(false);
    setStatusMessage("Starting question generation...");
    setPollingCount(0);

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/questions/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobDescription,
            experienceLevel: experience,
            numQuestions,
            questionTypes, // This will be an array of selected types
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start question generation");
      }

      const data: ApiResponse = await response.json();

      if (data.jobId) {
        setJobId(data.jobId);
        setStatusMessage("Generating questions...");
        // Start polling
        setTimeout(() => pollJobStatus(data.jobId!), 1000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to generate questions. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGenerateNew = () => {
    setQuestions([]);
    setIsComplete(false);
    setJobDescription("");
    setExperience("");
  };

  const questionsRef = useRef<HTMLDivElement>(null);

  const downloadQuestions = async (format: 'json' | 'pdf' = 'json') => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(questions, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `interview-questions-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf' && questionsRef.current) {
      try {
        // Create a clone of the element to modify styles
        const element = questionsRef.current;
        const clone = element.cloneNode(true) as HTMLElement;
        
        // Make the clone invisible and position it off-screen
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.width = '210mm';
        clone.style.padding = '20mm';
        clone.style.boxSizing = 'border-box';
        
        // Replace oklch colors with hex/rgb equivalents
        const elements = clone.querySelectorAll('*');
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          // Check common color properties
          const colorProps = ['color', 'background-color', 'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'];
          
          colorProps.forEach(prop => {
            const color = style.getPropertyValue(prop);
            if (color.includes('oklch')) {
              // Replace oklch with a fallback color
              (el as HTMLElement).style.setProperty(prop, '#4f46e5', 'important'); // Using indigo-600 as fallback
            }
          });
        });
        
        // Add the clone to the document
        document.body.appendChild(clone);
        
        // Generate PDF from the clone
        const options = {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true,
          windowWidth: clone.scrollWidth,
          windowHeight: clone.scrollHeight,
          backgroundColor: '#ffffff',
          removeContainer: true
        };
        
        const canvas = await html2canvas(clone, options);
        const imgData = canvas.toDataURL('image/png');
        
        // Remove the clone
        document.body.removeChild(clone);
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
        
        // Add new pages if content is longer than one page
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + 10; // Add small margin
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
        }
        
        pdf.save(`interview-questions-${new Date().toISOString().split("T")[0]}.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again or use the JSON export option.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
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
                            onChange={() =>
                              handleQuestionTypeChange(option.value)
                            }
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
                      onChange={(e) =>
                        setNumQuestions(parseInt(e.target.value))
                      }
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
                        <h3 className="text-sm font-medium text-red-800">
                          {error}
                        </h3>
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
            ) : (
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
                                questionTypeOptions.find(
                                  (t) => t.value === type
                                )?.label
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
                          <span className="text-blue-600 font-bold">
                            {index + 1}
                          </span>
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
                      onClick={() => downloadQuestions('json')}
                      className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiDownload className="-ml-1 mr-2 h-4 w-4" />
                      Download JSON
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadQuestions('pdf')}
                      className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FiFileText className="-ml-1 mr-2 h-4 w-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
