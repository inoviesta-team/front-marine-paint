import MarineButton from '@components/ui/MarineButton';
import React, { useState } from 'react'

export default function ArticleSearch({ initialQuery = "" }) {
    const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const perPage = urlParams.get('per_page') || '12';
    
    window.location.href = `?page=1&per_page=${perPage}&search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto mb-4">
      <div className="flex flex-col sm:flex-row w-full gap-2">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-marine-blue"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>
        <MarineButton type="submit" className="rounded-lg">
          Cari
        </MarineButton>
      </div>
      {initialQuery && (
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-600 mr-2">
            Hasil pencarian untuk: <strong>{initialQuery}</strong>
          </span>
          <a
            href="?page=1&per_page=12"
            className="text-sm text-marine-blue hover:underline"
          >
            Reset
          </a>
        </div>
      )}
    </form>
  );
}
