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
    <div className="border border-black rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 h-48 flex items-center justify-center">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <span className="text-gray-400">Article Image</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-mono font-bold text-black text-xl mb-2">
          {article.title}
        </h3>
        <p className="font-mono text-gray-500 mb-3">{article.excerpt}</p>
        <div className="flex justify-between text-gray-500 text-sm mb-4">
          <span>{article.readTime}</span>
          <span>{article.publishedAt}</span>
        </div>
        <MarineButton as="a" href={article.url || "#"} variant="secondary" size="sm">
          Baca Selengkapnya
        </MarineButton>
      </div>
    </div>
  );
}
