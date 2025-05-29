import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiCpu, FiCode } from "react-icons/fi";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}

const steps: StepProps[] = [
  {
    icon: <FiFileText className="h-6 w-6" />,
    title: "Submit Job Details",
    description:
      "Provide the job description, required skills, and experience level.",
    color: "from-blue-50 to-blue-100",
    index: 1,
  },
  {
    icon: <FiCpu className="h-6 w-6" />,
    title: "AI Analyzes Requirements",
    description:
      "Our AI identifies key technical skills and qualifications from the job description.",
    color: "from-indigo-50 to-indigo-100",
    index: 2,
  },
  {
    icon: <FiCode className="h-6 w-6" />,
    title: "Generate Questions",
    description: "Get tailored technical questions with evaluation criteria.",
    color: "from-purple-50 to-purple-100",
    index: 3,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Technical
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hiring Process
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform transforms how you assess technical talent with an
            efficient, data-driven approach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-300"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 text-blue-600`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {step.description}
                </p>
                <div className="text-sm font-medium text-blue-600 flex items-center">
                  Step {step.index}
                  <span className="ml-2 text-blue-400">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
