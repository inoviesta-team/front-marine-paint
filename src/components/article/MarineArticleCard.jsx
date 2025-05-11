import React from 'react';
import MarineButton from '@components/ui/MarineButton';

export default function MarineArticleCard({ 
  article = {
    title: 'Tips Perawatan Cat Marine agar lebih Awet dan Tahan Lama',
    excerpt: 'Lorem ipsum dolor sit amet...',
    readTime: '3 mins reading',
    publishedAt: '1 month ago'
  },
  isShrink = false
}) {
  return (
    <div className={`${isShrink && "flex-shrink-0 max-w-96"} group h-full`}>
      <div className="marine-card overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300">
        {/* Enhanced image section with hover effect */}
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-marine-darkBlue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-marine-blue/10">
              <span className="text-marine-blue/60 font-sans">Article Image</span>
            </div>
          )}
          
          {/* Article metadata overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-sans text-marine-darkBlue z-20">
            {article.readTime}
          </div>
          {/* <div className="absolute top-4 right-4 bg-marine-blue/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-sans text-white z-20">
            {article.readTime}
          </div> */}
        </div>
        
        {/* Enhanced content section */}
        <div className="p-6 flex-1 flex flex-col">
          <p className='font-sans text-gray-600 text-sm mb-2'>
            {article.publishedAt}
          </p>
          <h3 className="font-sans font-bold text-marine-darkBlue text-xl mb-2.5 group-hover:text-marine-blue transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="font-sans text-gray-600 text-sm mb-5 line-clamp-2">
            {article.excerpt}
          </p>
          
          {/* Enhanced button with better positioning */}
          <div>
            <MarineButton 
              as="a" 
              href={`/articles/${article.id}`} 
              variant="tertiary" 
              // size="sm"
              className="border w-full text-center rounded-xl"
            >
              Baca Selengkapnya
            </MarineButton>
          </div>
        </div>
      </div>
    </div>
  );
}
