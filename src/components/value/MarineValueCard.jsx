import React from 'react';

export default function MarineValueCard({ title }) {
  return (
    <div className="border border-black rounded-lg p-6">
      <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mb-4 mx-auto">
        <span className="text-gray-400">Icon</span>
      </div>
      <h3 className="font-mono font-bold text-black text-center">{title}</h3>
    </div>
  );
}
