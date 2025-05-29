import React from "react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "This AI interview question generator saved me hours! The questions were spot-on and helped me find the perfect candidate.",
      name: "Jane Doe, Senior Recruiter",
      avatar: "https://via.placeholder.com/150/a0a0a0/ffffff?text=JD", // Placeholder avatar
    },
    {
      quote:
        "A fantastic tool for technical hiring managers. It quickly generates relevant questions tailored to the role.",
      name: "John Smith, Engineering Lead",
      avatar: "https://via.placeholder.com/150/b0b0b0/ffffff?text=JS", // Placeholder avatar
    },
    {
      quote:
        "Easy to use and highly effective. Gets the job done and provides great question ideas.",
      name: "Alice Johnson, HR Manager",
      avatar: "https://via.placeholder.com/150/c0c0c0/ffffff?text=AJ", // Placeholder avatar
    },
  ];

  return (
    <section className="w-full py-20 px-4 text-center bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-gray-800">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100/70 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-gray-200/50"
            >
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name}'s avatar`}
                className="w-20 h-20 rounded-full mb-4 shadow-md"
              />
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-gray-800 font-semibold">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
