import MarineButton from '@components/ui/MarineButton';
import React from 'react';

export default function MarineProjectCard({ project = { name: 'KM BUANA', type: 'Ship' }, isShrink = false }) {
  return (
    <div className={`${isShrink && "flex-shrink-0 max-w-80"} marine-card overflow-hidden group`}>
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
      <div className="px-4 pt-4 flex justify-between items-center">
        <div>
          <h3 className="font-sans font-bold text-marine-darkBlue text-xl mb-1">{project.name}</h3>
          {/* <p className="font-sans font-bold text-marine-blue">{project.type}</p> */}
          <p className="font-sans text-neutral-600/90 line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, adipisci!</p>
        </div>
      </div>
      <div className="px-4 py-4">
      <MarineButton
          as="a" 
          href="/products" 
          variant="tertiary"
          size="md"
          className="border-marine-blue/50 text-marine-blue/85 font-sans w-full text-center  rounded-xl py-2 transition-all duration-300"
        >
          Detail
        </MarineButton>
      </div>
    </div>
  );
}
