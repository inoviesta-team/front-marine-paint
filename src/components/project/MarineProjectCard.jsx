import React from 'react';

export default function MarineProjectCard({ project = { name: 'KM BUANA', type: 'Ship' } }) {
  return (
    <div className="marine-card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-marine-darkBlue/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Project Image</span>
          </div>
        )}
      </div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-sans font-bold text-marine-darkBlue text-xl mb-1">{project.name}</h3>
          <p className="font-sans font-bold text-marine-blue">{project.type}</p>
        </div>
        <a href="#" className="font-sans text-marine-lightBlue hover:text-marine-blue transition-colors">Detail</a>
      </div>
    </div>
  );
}
