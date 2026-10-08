import React, { useState, useEffect, useRef } from 'react';
import SearchPopup from './SearchPopup';
import { mockSearchResults } from './mockData';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  searchFilter = 'movies',
  onFilterChange,
  searchInputRef,
  isHighlighted = false,
  onJoinClub,
  onCreateClub,
  joinedClubTitles = [],
  existingClubTitles = [],
  joinedClubNames
}) => {
  const effectiveJoined = joinedClubTitles.length > 0 ? joinedClubTitles : (joinedClubNames || []);
  const [internalQuery, setInternalQuery] = useState('');
  const [internalFilter, setInternalFilter] = useState('movies');
  const [isDismissed, setIsDismissed] = useState(false);
  const containerRef = useRef(null);

  const query = searchQuery !== undefined ? searchQuery : internalQuery;
  const filter = searchFilter !== undefined ? searchFilter : internalFilter;

  const handleQueryChange = (val) => {
    setIsDismissed(false);
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalQuery(val);
    }
  };

  const handleFilterChange = (f) => {
    if (onFilterChange) {
      onFilterChange(f);
    } else {
      setInternalFilter(f);
    }
  };

  const filteredResults = mockSearchResults.filter((item) =>
    item.type === filter && item.title.toLowerCase().includes(query.toLowerCase())
  );

  // Click outside listener to dismiss popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Do not dismiss search if interacting with modal overlays or dialogs
      if (
        event.target.closest &&
        (event.target.closest('.create-club-modal-overlay') || event.target.closest('[role="dialog"]'))
      ) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDismissed(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isOpen = !isDismissed && query.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className={`search-container ${isHighlighted ? 'search-spotlight' : ''}`}
    >
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
        ref={searchInputRef}
        type="text"
        className="search-bar"
        placeholder="Search movies, shows, books..."
        value={query}
        onFocus={() => {
          if (query.trim().length > 0) setIsDismissed(false);
        }}
        onChange={(e) => handleQueryChange(e.target.value)}
      />

      {isOpen && query.trim().length > 0 && (
        <SearchPopup
          filter={filter}
          onFilterChange={handleFilterChange}
          results={filteredResults}
          query={query}
          onJoinClub={onJoinClub}
          onCreateClub={onCreateClub}
          joinedClubTitles={effectiveJoined}
          existingClubTitles={existingClubTitles}
        />
      )}
    </div>
  );
};

export default SearchBar;
