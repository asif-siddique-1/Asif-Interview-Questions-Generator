import React from "react";

interface CallToActionProps {
  scrollToDemo: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ scrollToDemo }) => {
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
        {/* CTA Button - will likely use scrolling later */}
        <button
          onClick={scrollToDemo}
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Start Generating Now
        </button>
        {/* Optional: Support Email */}
        {/* <p className="mt-8 text-gray-200">Need help? Contact us at support@example.com</p> */}
      </div>
    </section>
  );
};

export default CallToAction;
