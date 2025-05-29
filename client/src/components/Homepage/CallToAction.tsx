import React from "react";
import { Link } from "react-router";

const CallToAction: React.FC = () => {
  return (
    <section className="w-full py-20 px-4 bg-blue-600 text-white text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Generate Interview Questions?
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Try the live demo now and see how easy it is to create tailored
          questions for any role.
        </p>
        <Link
          to={"/generate-questions"}
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Start Generating Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
