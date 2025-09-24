import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
  searchQuery: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onFilterToggle,
  searchQuery 
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ürün ara... (örn: akıllı, su şişesi, kablosuz)"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              // Real-time search
              onSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
        <button
          type="button"
          onClick={onFilterToggle}
          className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
        >
          <SlidersHorizontal size={18} />
          <span className="hidden sm:inline">Filtreler</span>
        </button>
      </form>
    </div>
  );
};