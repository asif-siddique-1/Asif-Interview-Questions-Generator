import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiCode, FiUsers, FiBarChart2 } from "react-icons/fi";
import { Link } from "react-router";

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Technical Assessments
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Made Simple for Recruiters
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Create targeted technical interviews with AI-generated questions,
            evaluation criteria, and candidate insights—all in one platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to={"/generate-questions"}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Generate Questions
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              {
                icon: <FiSearch className="w-6 h-6 text-blue-600" />,
                text: "Smart Job Description Analysis",
                color: "from-blue-50 to-blue-100",
              },
              {
                icon: <FiCode className="w-6 h-6 text-indigo-600" />,
                text: "Custom Question Generation",
                color: "from-indigo-50 to-indigo-100",
              },
              {
                icon: <FiUsers className="w-6 h-6 text-purple-600" />,
                text: "Candidate Evaluation Tools",
                color: "from-purple-50 to-purple-100",
              },
              {
                icon: <FiBarChart2 className="w-6 h-6 text-rose-600" />,
                text: "Performance Analytics",
                color: "from-rose-50 to-rose-100",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.text}
                </h3>
              </div>
            ))}
          </motion.div>

          {/* Code Example */}
          <motion.div
            className="mt-16 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 inline-block max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-left text-sm text-gray-600 font-mono bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="whitespace-pre-wrap">
                <code>
                  {`// Example: Generate technical questions
const assessment = await createAssessment({
  role: "Senior Frontend Developer",
  experience: "5+ years",
  skills: ["React", "TypeScript", "State Management"],
  difficulty: "Advanced",
  questionCount: 10
});`}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
