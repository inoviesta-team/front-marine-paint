import React from 'react';
import MarineButton from '@components/ui/MarineButton';

export default function MarineArticleCard({ 
  article = {
    title: 'Tips Perawatan Cat Marine agar lebih Awet dan Tahan Lama',
    excerpt: 'Lorem ipsum dolor sit amet...',
    readTime: '3 mins reading',
    publishedAt: '1 month ago'
  }
}) {
  return (
    <div className="marine-card overflow-hidden group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-marine-blue/30 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Article Image</span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between text-marine-blue/70 text-sm mb-2">
          <span>{article.readTime}</span>
          <span>{article.publishedAt}</span>
        </div>
        <h3 className="font-mono font-bold text-marine-darkBlue text-xl mb-2">
          {article.title}
        </h3>
        <p className="font-mono text-gray-600 mb-4 flex-1">{article.excerpt}</p>
        <MarineButton as="a" href={`/articles/${article.id}`} variant="secondary" size="sm">
          Baca Selengkapnya
        </MarineButton>
      </div>
    </div>
  );
}
