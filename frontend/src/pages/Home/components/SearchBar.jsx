import React, { useState } from 'react';
import SearchPopup from './SearchPopup';
import { mockSearchResults } from './mockData';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('movies'); // 'movies', 'tv', 'books'

  const filteredResults = mockSearchResults.filter((item) => 
    item.type === searchFilter && item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-container">
      <svg 
        className="search-icon" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {searchQuery.length > 0 && (
        <SearchPopup 
          filter={searchFilter}
          onFilterChange={setSearchFilter}
          results={filteredResults}
        />
      )}
    </div>
  );
};

export default SearchBar;
