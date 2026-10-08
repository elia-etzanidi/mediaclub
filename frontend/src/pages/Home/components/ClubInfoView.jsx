import React from 'react';
import './ClubInfoView.css';
import { getClubMediaDetails } from './mockData';

const ClubInfoView = ({ club, activeChannel, onSelectChannel }) => {
  const media = getClubMediaDetails(club);

  if (!media) return null;

  const handleGoToGeneral = () => {
    if (!onSelectChannel) return;
    const generalChannel = club?.channels?.find((c) => c.name === 'general');
    if (generalChannel) {
      onSelectChannel(generalChannel.id);
    } else if (club?.channels?.length > 1) {
      onSelectChannel(club.channels[1].id);
    }
  };

  const moderators = club?.members?.filter((m) => m.role === 'moderator') || [];
  const primaryMod = moderators[0] || club?.members?.[0] || { name: 'Club Creator' };

  return (
    <div className="club-info-board">
      {/* Top Bar Navigation (Matches ChatArea Top Nav) */}
      <div className="info-top-nav">
        <div className="info-nav-left">
          <span className="info-nav-icon">ⓘ</span>
          <span className="info-nav-name">{activeChannel?.name || 'info'}</span>
          <span className="info-nav-divider">|</span>
          <span className="info-nav-subtext">Club Overview & Details</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="info-scroll-container">
        {/* Media Hero Showcase */}
        <section className="info-hero-section">
          <div className="info-hero-backdrop-glow" />

          <div className="info-hero-content">
            {/* Poster Card */}
            <div className="info-poster-wrapper">
              <img
                src={media.img || club.img}
                alt={media.title}
                className="info-poster-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 180'%3E%3Crect width='130' height='180' rx='10' fill='%23004643'/%3E%3Ctext x='65' y='95' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='18' text-anchor='middle'%3E${encodeURIComponent(media.title.slice(0, 4).toUpperCase())}%3C/text%3E%3C/svg%3E`;
                }}
              />
              <span className="info-poster-type-badge">
                {media.mediaType === 'tv'
                  ? 'TV Series'
                  : media.mediaType === 'books'
                  ? 'Book'
                  : 'Movie'}
              </span>
            </div>

            {/* Header Metadata */}
            <div className="info-hero-details">
              <div className="info-hero-header-row">
                <span className="info-official-tag">✦ Official Club</span>
                <span className="info-status-pill">{media.status}</span>
              </div>

              <h1 className="info-hero-title">{media.title}</h1>

              {media.tagline && (
                <p className="info-hero-tagline">“{media.tagline}”</p>
              )}

              {/* Chips / Meta Pills */}
              <div className="info-meta-chips-row">
                <span className="info-chip chip-date">
                  📅 {media.date || media.year}
                </span>
                {media.contentRating && (
                  <span className="info-chip chip-rating-badge">
                    {media.contentRating}
                  </span>
                )}
                {media.runtime && (
                  <span className="info-chip chip-runtime">
                    ⏱ {media.runtime}
                  </span>
                )}
                {media.rating && (
                  <span className="info-chip chip-score">
                    ★ {media.rating}
                  </span>
                )}
              </div>

              {/* Genres */}
              {media.genre && (
                <div className="info-genres-row">
                  {media.genre.split(/[/,•]/).map((g, idx) => {
                    const trimmed = g.trim();
                    if (!trimmed) return null;
                    return (
                      <span key={idx} className="info-genre-pill">
                        {trimmed}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Key Personnel */}
              <div className="info-creator-row">
                <div className="info-creator-item">
                  <span className="info-creator-label">
                    {media.creatorRole || (media.mediaType === 'books' ? 'Author' : 'Director')}:
                  </span>
                  <span className="info-creator-val">{media.creator}</span>
                </div>
                {media.cast && media.cast.length > 0 && (
                  <div className="info-cast-item">
                    <span className="info-creator-label">Key Figures:</span>
                    <span className="info-cast-val">
                      {media.cast.slice(0, 3).join(', ')}
                      {media.cast.length > 3 && ` +${media.cast.length - 3} more`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Synopsis & About Section */}
        <section className="info-section">
          <div className="info-section-header">
            <h2 className="info-section-title">Synopsis & Overview</h2>
          </div>
          <div className="info-section-body">
            <div className="info-synopsis-text">
              {media.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="info-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {media.quote && (
              <blockquote className="info-quote-box">
                <span className="info-quote-mark">“</span>
                <p className="info-quote-text">{media.quote}</p>
              </blockquote>
            )}
          </div>
        </section>

        {/* Media Specifications Grid */}
        <section className="info-section">
          <div className="info-section-header">
            <h2 className="info-section-title">Details & Specifications</h2>
          </div>
          <div className="info-section-body">
            <div className="info-specs-grid">
              <div className="info-spec-item">
                <span className="spec-label">Original Title</span>
                <span className="spec-value">{media.title}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Media Type</span>
                <span className="spec-value">{media.typeLabel}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Release Date</span>
                <span className="spec-value">{media.date || media.year}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Language</span>
                <span className="spec-value">{media.language}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Studio / Publisher</span>
                <span className="spec-value">{media.studio}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Club Moderator</span>
                <span className="spec-value highlight-mod">𖤝 {primaryMod.name}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Community Size</span>
                <span className="spec-value">
                  {club?.members?.length || 1} Member{club?.members?.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Club Status</span>
                <span className="spec-value highlight-status">Active Club</span>
              </div>
            </div>
          </div>
        </section>

        {/* Notable Cast / Figures */}
        {media.cast && media.cast.length > 0 && (
          <section className="info-section">
            <div className="info-section-header">
              <h2 className="info-section-title">Notable Characters & Cast</h2>
            </div>
            <div className="info-section-body">
              <div className="info-cast-chips">
                {media.cast.map((person, idx) => (
                  <span key={idx} className="info-cast-chip">
                    <span className="cast-dot">✦</span> {person}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Channels Directory & Guidelines */}
        <section className="info-section">
          <div className="info-section-header">
            <h2 className="info-section-title">Club Channels & Guidelines</h2>
          </div>
          <div className="info-section-body">
            <div className="info-channels-grid">
              <div className="info-channel-card active-card">
                <div className="info-channel-header">
                  <span className="info-channel-name">ⓘ #info</span>
                  <span className="info-channel-badge">Information</span>
                </div>
                <p className="info-channel-desc">
                  Official media overview, details, specifications, and club guidelines.
                </p>
              </div>

              <div
                className="info-channel-card clickable-card"
                onClick={handleGoToGeneral}
                title="Click to jump to #general"
              >
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ #general</span>
                  <span className="info-channel-badge">Main Chat</span>
                </div>
                <p className="info-channel-desc">
                  General conversation, first impressions, and meeting fellow members. Spoiler-free!
                </p>
              </div>

              <div className="info-channel-card">
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ #spoilers</span>
                  <span className="info-channel-badge">Spoilers</span>
                </div>
                <p className="info-channel-desc">
                  Deep dive into major plot twists, endings, theories, and unreserved spoilers.
                </p>
              </div>

              <div className="info-channel-card">
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ #reviews</span>
                  <span className="info-channel-badge">Reviews</span>
                </div>
                <p className="info-channel-desc">
                  Ratings, in-depth critiques, personal analyses, and review discussions.
                </p>
              </div>

              <div className="info-channel-card">
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ #requests</span>
                  <span className="info-channel-badge">Community</span>
                </div>
                <p className="info-channel-desc">
                  Suggestions for watch parties, read-along schedules, and media recommendations.
                </p>
              </div>
            </div>

            {/* Quick spoiler note */}
            <div className="info-guidelines-box">
              <span className="info-guidelines-icon">🛡️</span>
              <div className="info-guidelines-content">
                <strong>Spoiler Guidelines:</strong> Keep discussions in <code>#general</code> spoiler-free so new viewers and readers can browse safely. All major reveals belong in <code>#spoilers</code>.
              </div>
            </div>
          </div>
        </section>

        {/* Footer Call to Action */}
        <div className="info-footer-cta">
          <div className="info-cta-text">
            <h3>Join the conversation</h3>
            <p>Connect with other fans in <strong>#general</strong> to share your thoughts.</p>
          </div>
          <button
            type="button"
            className="info-cta-button"
            onClick={handleGoToGeneral}
          >
            Go to #general channel <span className="cta-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubInfoView;
