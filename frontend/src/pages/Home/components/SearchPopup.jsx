import React from 'react';

const SearchPopup = ({ filter, onFilterChange, results }) => {
  const filterOptions = ['movies', 'tv', 'books'];

  return (
    <div className="search-popup">
      {/* Header / Tabs */}
      <div className="search-popup-header">
        {filterOptions.map((f) => (
          <button
            key={f}
            type="button"
            className={`search-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f === 'tv' ? 'TV Series' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Body / Results */}
      <div className="search-popup-body">
        {results.length > 0 ? (
          <div className="search-results-list">
            {results.map((item) => (
              <div key={item.id} className="search-result-item">
                <img src={item.photo} alt={item.title} className="search-result-photo" />
                <div className="search-result-info">
                  <div className="search-result-title">{item.title}</div>
                  <div className="search-result-meta">{item.genre} • {item.year}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="search-no-results">
            Couldn't find any results
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
