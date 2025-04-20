import React from 'react';

export default function MarineProjectCard({ project = { name: 'KM BUANA', type: 'Ship' } }) {
  return (
    <div className="border border-black rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 h-48 flex items-center justify-center">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <span className="text-gray-400">Project Image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-mono font-bold text-black text-xl mb-1">{project.name}</h3>
        <p className="font-mono font-bold text-gray-500 mb-2">{project.type}</p>
        <p className="font-mono text-black">Detail</p>
      </div>
    </div>
  );
}
