import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiLayers, FiTarget, FiCheckCircle } from "react-icons/fi";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const features: FeatureProps[] = [
  {
    icon: <FiFileText className="h-6 w-6 text-blue-600" />,
    title: "Job Description Analysis",
    description:
      "Upload or paste job descriptions to automatically extract key technical requirements and skills.",
    color: "from-blue-50 to-blue-100",
    delay: 0.1,
  },
  {
    icon: <FiTarget className="h-6 w-6 text-indigo-600" />,
    title: "Skill-Based Question Bank",
    description:
      "Access a comprehensive database of questions categorized by technical skills and frameworks.",
    color: "from-indigo-50 to-indigo-100",
    delay: 0.2,
  },
  {
    icon: <FiLayers className="h-6 w-6 text-purple-600" />,
    title: "Difficulty Calibration",
    description:
      "Automatically adjust question difficulty based on candidate experience level.",
    color: "from-purple-50 to-purple-100",
    delay: 0.3,
  },
  {
    icon: <FiCheckCircle className="h-6 w-6 text-emerald-600" />,
    title: "Evaluation Criteria",
    description:
      "Get detailed rubrics and evaluation guidelines for consistent candidate assessment.",
    color: "from-emerald-50 to-emerald-100",
    delay: 0.4,
  },
];

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="relative w-full py-20 px-4 bg-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
            Recruiter Tools
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Streamline Your Technical{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hiring Process
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Our AI-powered platform helps you create targeted technical
            assessments, evaluate candidates consistently, and identify top
            talent efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="group"
            >
              <div className="h-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-inner`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
