import React from 'react';

export default function MarineTestimonialCard({ 
  testimonial = {
    quote: 'Lorem ipsum dolor sit amet consectetur. Ut quis turpis molestie lacus dapibus lorem eget nisi facilisi. Mauris eros neque odio mattis donec nisl. Dui vel nisi at vitae',
    author: 'Alex Jhoe',
    company: 'PT Lorem Ipsum'
  }
}) {
  return (
    <div className="marine-card p-6 relative">
      <div className="absolute top-4 left-4 text-4xl font-serif text-marine-lightBlue opacity-20">"</div>
      <p className="font-mono text-gray-700 mb-6 relative z-10">
        {testimonial.quote}
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-marine-blue/10 rounded-full flex items-center justify-center mr-4 overflow-hidden">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <span className="text-gray-400">Avatar</span>
          )}
        </div>
        <div>
          <h4 className="font-mono font-bold text-marine-darkBlue">{testimonial.author}</h4>
          <p className="font-mono text-gray-600 text-sm">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}
