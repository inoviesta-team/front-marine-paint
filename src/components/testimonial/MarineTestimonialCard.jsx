import React from 'react';

export default function MarineTestimonialCard({ 
  testimonial = {
    quote: 'Lorem ipsum dolor sit amet consectetur. Ut quis turpis molestie lacus dapibus lorem eget nisi facilisi. Mauris eros neque odio mattis donec nisl. Dui vel nisi at vitae',
    author: 'Alex Jhoe',
    company: 'PT Lorem Ipsum'
  }
}) {
  return (
    <div className="max-w-72 sm:max-w-96 flex-shrink-0 cursor-pointer group marine-card relative shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Background accent elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-marine-blue to-marine-lightBlue opacity-80 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-marine-blue/5 group-hover:bg-marine-blue/10 transition-colors"></div>
      
      <div className=" bg-white rounded-lg p-4 flex-shrink-0">
      <div className="flex items-center gap-3 mb-3">
        <img src={"https://randomuser.me/api/portraits/women/1.jpg"} alt={testimonial.company} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold">{testimonial.author}</p>
          <p className="text-sm text-gray-500">{testimonial.company}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm italic">
        <span className="text-xl text-gray-400">“ </span>
        {testimonial.quote}
        <span className="text-xl text-gray-400"> ”</span>
      </p>
    </div>
    </div>
  );
}
