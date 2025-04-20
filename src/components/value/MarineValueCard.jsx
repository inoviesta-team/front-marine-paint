import React from 'react';

export default function MarineValueCard({ title, description, iconNumber = 1 }) {
  return (
    <div className="marine-card p-8 hover:border-marine-blue hover:translate-y-[-5px] transition-all duration-300 group">
      {/* Enhanced icon container with gradient background */}
      <div className="w-20 h-20 flex items-center justify-center mb-6 mx-auto bg-gradient-to-br from-marine-blue/20 to-marine-lightBlue/20 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
        <img 
          src={`/images/value/value_${iconNumber}.svg`} 
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Enhanced title with better typography */}
      <h3 className="font-sans font-bold text-marine-darkBlue text-xl text-center mb-3">{title}</h3>
      
      {/* Added description with proper styling */}
      {description && (
        <p className="font-sans text-gray-600 text-center">{description}</p>
      )}
    </div>
  );
}
