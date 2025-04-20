import React from 'react';

export default function MarineTestimonialCard({ 
  testimonial = {
    quote: 'Lorem ipsum dolor sit amet consectetur. Ut quis turpis molestie lacus dapibus lorem eget nisi facilisi. Mauris eros neque odio mattis donec nisl. Dui vel nisi at vitae',
    author: 'Alex Jhoe',
    company: 'PT Lorem Ipsum'
  }
}) {
  return (
    <div className="border border-black rounded-lg p-6">
      <p className="font-mono text-black mb-6">
        {testimonial.quote}
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mr-4">
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
          <h4 className="font-mono font-bold text-black">{testimonial.author}</h4>
          <p className="font-mono text-gray-600 text-sm">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}
