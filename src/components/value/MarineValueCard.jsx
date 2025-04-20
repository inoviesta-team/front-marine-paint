import React from 'react';

export default function MarineValueCard({ title, iconNumber = 1 }) {
  return (
    <div className="border border-black rounded-lg p-6">
      <div className="w-12 h-12 flex items-center justify-center mb-4 mx-auto">
        <img 
          src={`/images/value/value_${iconNumber}.svg`} 
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-mono font-bold text-black text-center">{title}</h3>
    </div>
  );
}
