import React from "react";

const LoadingIndicator: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-400"></div>
  </div>
);

export default LoadingIndicator;
