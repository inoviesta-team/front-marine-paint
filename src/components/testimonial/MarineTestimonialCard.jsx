import React from 'react';

export default function MarineTestimonialCard({ 
  testimonial = {
    quote: 'Lorem ipsum dolor sit amet consectetur. Ut quis turpis molestie lacus dapibus lorem eget nisi facilisi. Mauris eros neque odio mattis donec nisl. Dui vel nisi at vitae',
    author: 'Alex Jhoe',
    company: 'PT Lorem Ipsum'
  }
}) {
  return (
    <div className="group marine-card p-8 relative shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Background accent elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-marine-blue to-marine-lightBlue opacity-80 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-marine-blue/5 group-hover:bg-marine-blue/10 transition-colors"></div>
      
      {/* Enhanced quote styling */}
      <div className="relative mb-6">
        <div className="absolute -top-2 -left-2 text-6xl font-serif text-marine-lightBlue opacity-15 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-300">"</div>
        <div className="absolute -bottom-2 -right-2 text-6xl font-serif text-marine-lightBlue opacity-15 group-hover:opacity-20 transition-opacity rotate-180 transform group-hover:scale-110 duration-300">"</div>
        <p className="font-sans text-gray-700 relative z-10 text-lg italic leading-relaxed">
          {testimonial.quote}
        </p>
      </div>
      
      {/* Enhanced author info section with better styling */}
      <div className="flex items-center mt-8 pt-6 border-t border-gray-100">
        <div className="w-16 h-16 bg-gradient-to-br from-marine-blue to-marine-lightBlue rounded-full flex items-center justify-center mr-4 overflow-hidden shadow-md">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-marine-blue/80 flex items-center justify-center text-white font-bold text-xl">
              {testimonial.author.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-sans font-bold text-marine-darkBlue text-lg">{testimonial.author}</h4>
          <p className="font-sans text-marine-blue text-sm">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}
