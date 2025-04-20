import React from 'react';

export default function MarineValueCard({ title, iconNumber = 1 }) {
  return (
    <div className="marine-card p-6 hover:border-marine-blue hover:translate-y-[-5px] transition-all">
      <div className="w-16 h-16 flex items-center justify-center mb-6 mx-auto bg-marine-blue/10 rounded-full p-3">
        <img 
          src={`/images/value/value_${iconNumber}.svg`} 
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-mono font-bold text-marine-darkBlue text-center">{title}</h3>
    </div>
  );
}
