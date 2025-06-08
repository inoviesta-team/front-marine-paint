import React from 'react';
import MarineButton from '@components/ui/MarineButton';
import { valueUtil } from '@utils/valueUtil';
import { Clock } from 'lucide-react';

export default function MarineProjectCard({ 
  project = {
    title: 'Sample Project',
    excerpt: 'Lorem ipsum dolor sit amet...',
    date: '2024-01-01'
  },
  isShrink = false
}) {
  const image = project?.yoast_head_json?.schema?.["@graph"].find((item) => item["@type"] === "ImageObject");
  
  return (
    <div className={`${isShrink && "flex-shrink-0 min-w-72 max-w-72"} group h-full`}>
      <div className="marine-card overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300">
        {/* Enhanced image section with hover effect */}
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-marine-darkBlue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

          <img
              src={image?.url ?? "/images/no-image.png"}
              alt={project.title?.rendered || project.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.src = "/images/no-image.png"
              }}
            />
        </div>
        
        {/* Enhanced content section */}
        <div className="p-6 flex-1 flex flex-col">
          <p className='flex items-center gap-1 font-sans text-marine-accent text-sm mb-2'>
            <Clock size={16} color='#155da2' /><span>{valueUtil.calculateTimeDistance(project.date)}</span>
          </p>
          <h3 className="font-sans font-bold text-marine-darkBlue text-xl mb-2.5 group-hover:text-marine-blue transition-colors duration-300 line-clamp-1">
            {project?.title?.rendered || project.title}
          </h3>   
          
          <div className="font-sans text-marine-blue text-sm mb-5 line-clamp-1" dangerouslySetInnerHTML={{__html: project?.excerpt?.rendered || project.excerpt}} />
          
          {/* Enhanced button with better positioning */}
          <div>
            <MarineButton 
              as="a" 
              href={`/projects/${project.slug}`} 
              variant="tertiary" 
              className="border w-full text-center rounded-xl"
            >
              Lihat Detail
            </MarineButton>
          </div>
        </div>
      </div>
    </div>
  );
}
