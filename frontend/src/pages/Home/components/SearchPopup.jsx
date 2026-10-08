import React from 'react';

const SearchPopup = ({
  filter,
  onFilterChange,
  results = [],
  query = '',
  onJoinClub,
  onCreateClub,
  joinedClubTitles = [],
  existingClubTitles = []
}) => {
  const filterOptions = [
    { key: 'movies', label: 'Movies' },
    { key: 'tv', label: 'TV Series' },
    { key: 'books', label: 'Books' }
  ];

  return (
    <div className="search-popup">
      {/* Header / Filter Tabs */}
      <div className="search-popup-header">
        {filterOptions.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`search-filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => onFilterChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Body / Results */}
      <div className="search-popup-body">
        {results.length > 0 ? (
          <div className="search-results-list">
            {results.map((item) => {
              const isJoined = joinedClubTitles.some(
                (t) => t.toLowerCase() === item.title.toLowerCase()
              );
              const clubExists = existingClubTitles.some(
                (t) => t.toLowerCase() === item.title.toLowerCase()
              );

              return (
                <div key={item.id} className="search-result-item">
                  <img src={item.photo} alt={item.title} className="search-result-photo" />
                  <div className="search-result-info">
                    <div className="search-result-title">{item.title}</div>
                    <div className="search-result-meta">
                      {item.genre} • {item.year}
                      <span className={`search-club-tag ${clubExists ? 'active' : 'uncreated'}`}>
                        {clubExists ? 'Club active' : 'No club yet'}
                      </span>
                    </div>
                  </div>
                  <div className="search-result-action">
                    {isJoined ? (
                      <span className="search-result-joined-badge">Joined ✓</span>
                    ) : clubExists ? (
                      <button
                        type="button"
                        className="search-result-join-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onJoinClub) onJoinClub(item);
                        }}
                      >
                        Join Club
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="search-result-create-btn"
                        title={`Create the official club for ${item.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onCreateClub) onCreateClub(item);
                        }}
                      >
                        + Create Club
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="search-no-results">
            <div className="search-no-results-icon">⌕</div>
            <div className="search-no-results-text">
              No {filter === 'tv' ? 'TV series' : filter === 'movies' ? 'movies' : 'books'} found for "{query}"
            </div>
            <p className="search-no-results-subtext">
              Clubs can only be created for existing titles. Try searching for a different title.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;

