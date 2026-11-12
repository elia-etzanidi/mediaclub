import React from 'react';
import { generateClubProfilePicture, findMatchingClub } from '../../../services/clubService';

const SearchPopup = ({
  filter,
  onFilterChange,
  results = [],
  query = '',
  onJoinClub,
  onCreateClub,
  joinedClubs = [],
  systemClubs = [],
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
              // 1. Check if the user has already joined the club for this specific media item
              const joinedClub = findMatchingClub(joinedClubs, item);
              const isJoined = Boolean(joinedClub);

              // 2. Check if a club for this specific media item already exists in the system
              const matchedClub = joinedClub || findMatchingClub(systemClubs, item);
              const clubExists = Boolean(matchedClub);

              const subText = item.type === 'books'
                ? `${item.author || 'Author'}${item.year ? ` • ${item.year}` : ''}`
                : `${item.genre || (item.type === 'tv' ? 'TV Series' : 'Movie')}${item.year ? ` • ${item.year}` : ''}`;

              return (
                <div
                  key={item.id}
                  className="search-result-item"
                  onClick={() => {
                    if (isJoined) {
                      if (onJoinClub && joinedClub) onJoinClub(joinedClub);
                      return;
                    }
                    if (clubExists) {
                      const joinedTarget = matchedClub ? { ...item, ...matchedClub } : item;
                      if (onJoinClub) onJoinClub(joinedTarget);
                    } else {
                      if (onCreateClub) onCreateClub(item);
                    }
                  }}
                >
                  <img
                    src={
                      item.photo ||
                      item.coverImageUrl ||
                      item.img ||
                      generateClubProfilePicture(item.title || item.name, item.type || item.mediaType)
                    }
                    alt={item.title}
                    className="search-result-photo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = generateClubProfilePicture(item.title || item.name, item.type || item.mediaType);
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
                          const joinedTarget = matchedClub ? { ...item, ...matchedClub } : item;
                          if (onJoinClub) onJoinClub(joinedTarget);
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
