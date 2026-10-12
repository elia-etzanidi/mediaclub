import React from 'react';

const SearchPopup = ({
  filter,
  onFilterChange,
  results = [],
  query = '',
  onJoinClub,
  onCreateClub,
  joinedClubTitles = [],
  existingClubTitles = [],
  isLoading = false
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
        {isLoading ? (
          <div className="search-results-list">
            {[1, 2, 3].map((n) => (
              <div key={n} className="search-skeleton-item">
                <div className="search-skeleton-photo" />
                <div className="search-skeleton-lines">
                  <div className="search-skeleton-line" />
                  <div className="search-skeleton-line short" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="search-results-list">
            {results.map((item) => {
              const isJoined = joinedClubTitles.some(
                (t) => t.toLowerCase() === item.title.toLowerCase()
              );
              const clubExists = existingClubTitles.some(
                (t) => t.toLowerCase() === item.title.toLowerCase()
              );

              const subText = item.type === 'books'
                ? `${item.author || 'Author'} • ${item.year || 'Book'}`
                : `${item.genre || 'Media'} • ${item.year || ''}`;

              return (
                <div
                  key={item.id}
                  className="search-result-item"
                  onClick={() => {
                    if (isJoined) return;
                    if (clubExists) {
                      if (onJoinClub) onJoinClub(item);
                    } else {
                      if (onCreateClub) onCreateClub(item);
                    }
                  }}
                >
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="search-result-photo"
                    onError={(e) => {
                      e.target.onerror = null;
                      const initial = item.title ? item.title.slice(0, 3).toUpperCase() : 'MED';
                      const bgColor = item.type === 'books' ? '%23d97706' : item.type === 'tv' ? '%23357979' : '%23004643';
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 56'%3E%3Crect width='40' height='56' rx='4' fill='${bgColor}'/%3E%3Ctext x='20' y='32' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='12' text-anchor='middle'%3E${encodeURIComponent(initial)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div className="search-result-info">
                    <div className="search-result-title">{item.title}</div>
                    <div className="search-result-meta">
                      {subText}
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
              {filter === 'books'
                ? 'Try searching by book title or author on Open Library.'
                : 'Try searching by movie or TV series title on TMDB.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
