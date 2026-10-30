import React, { useState, useEffect } from 'react';
import './ClubInfoView.css';
import { getClubMediaDetails } from './mockData';
import { getMediaDetailsForClub } from '../../../services/mediaService';

const ClubInfoView = ({ club, activeChannel, onSelectChannel }) => {
  const [media, setMedia] = useState(() => club?.mediaDetails || getClubMediaDetails(club));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // If club already has preloaded rich details, use them immediately
    if (club?.mediaDetails && club.mediaDetails.description) {
      setMedia(club.mediaDetails);
      return;
    }

    // Set initial fallback so board is never empty
    const initial = club?.mediaDetails || getClubMediaDetails(club);
    if (initial) {
      setMedia(initial);
    }

    // Fetch full API details if externalId or externalSource is present
    if (club?.externalId || club?.externalSource) {
      setIsLoading(true);
      getMediaDetailsForClub(club)
        .then((details) => {
          if (isMounted && details) {
            setMedia(details);
            // Cache on club object so subsequent views are instant
            club.mediaDetails = details;
          }
        })
        .catch((err) => {
          console.warn('Could not load club media details:', err);
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [club]);

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
  const isBook = media.mediaType === 'books';
  const isTv = media.mediaType === 'tv';

  const cleanTagline = media.tagline
    ? media.tagline.trim().replace(/^["“'”]+|["“'”]+$/g, '').trim()
    : '';

  const cleanQuote = media.quote
    ? media.quote.trim().replace(/^["“'”]+|["“'”]+$/g, '').trim()
    : '';

  return (
    <div className="club-info-board">
      {/* Top Bar Navigation (Matches ChatArea Top Nav) */}
      <div className="info-top-nav">
        <div className="info-nav-left">
          <span className="info-nav-icon">✦</span>
          <span className="info-nav-name">{activeChannel?.name || 'info'}</span>
          <span className="info-nav-divider">|</span>
          <span className="info-nav-subtext">Club Overview & Details</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="info-scroll-container">
        {/* Media Hero Showcase */}
        <section className="info-hero-section">
          <div className="info-hero-content">
            {/* Poster Card */}
            <div className="info-poster-wrapper">
              <img
                src={media.img || club.img}
                alt={media.title}
                className="info-poster-image"
                onError={(e) => {
                  e.target.onerror = null;
                  const initial = media.title ? media.title.slice(0, 4).toUpperCase() : 'MED';
                  const bg = isBook ? '%23d97706' : isTv ? '%23357979' : '%23004643';
                  e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 180'%3E%3Crect width='130' height='180' rx='10' fill='${bg}'/%3E%3Ctext x='65' y='95' fill='%23fafafa' font-family='sans-serif' font-weight='bold' font-size='18' text-anchor='middle'%3E${encodeURIComponent(initial)}%3C/text%3E%3C/svg%3E`;
                }}
              />
              <span className="info-poster-type-badge">
                {isTv ? 'TV Series' : isBook ? 'Book' : 'Movie'}
              </span>
            </div>

            {/* Header Metadata */}
            <div className="info-hero-details">
              <h1 className="info-hero-title">{media.title}</h1>

              {cleanTagline && (
                <p className="info-hero-tagline">“{cleanTagline}”</p>
              )}

              {/* Chips / Meta Pills */}
              <div className="info-meta-chips-row">
                <span className="info-chip chip-date">
                  🗒 {media.date || media.year}
                </span>
                {media.contentRating && (
                  <span className="info-chip chip-rating-badge">
                    {media.contentRating}
                  </span>
                )}
                {media.runtime && (
                  <span className="info-chip chip-runtime">
                    {isBook ? '𓄲' : 'ⴵ'} {media.runtime}
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
                    if (
                      /^(franchise|series|form|facet|nyt|award|place|person|time|id):/i.test(trimmed) ||
                      trimmed.includes(':') ||
                      trimmed.includes('=')
                    ) {
                      return null;
                    }
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
                    {media.creatorRole || (isBook ? 'Author' : 'Director')}:
                  </span>
                  <span className="info-creator-val">{media.creator || 'Media Creator'}</span>
                </div>
                {media.cast && media.cast.length > 0 && (
                  <div className="info-cast-item">
                    <span className="info-creator-label">
                      {isBook ? 'Key Figures:' : 'Key Cast:'}
                    </span>
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
              {(media.description || '').split(/\n\s*\n/).map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                return (
                  <p key={idx} className="info-paragraph">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {cleanQuote && (
              <blockquote className="info-quote-box">
                <span className="info-quote-mark">“</span>
                <p className="info-quote-text">{cleanQuote}</p>
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
                <span className="spec-value">{media.typeLabel || (isTv ? 'TV Series' : isBook ? 'Book' : 'Movie')}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">{isBook ? 'Published Year' : 'Release Date'}</span>
                <span className="spec-value">{media.date || media.year}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Language</span>
                <span className="spec-value">{media.language || 'English'}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">{isBook ? 'Publisher' : 'Studio / Network'}</span>
                <span className="spec-value">{media.studio || 'Official Release'}</span>
              </div>

              <div className="info-spec-item">
                <span className="spec-label">Community Size</span>
                <span className="spec-value">
                  {club?.members?.length || 1} Member{club?.members?.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Notable Cast / Figures */}
        {media.cast && media.cast.length > 0 && (
          <section className="info-section">
            <div className="info-section-header">
              <h2 className="info-section-title">
                {isBook ? 'Notable Characters & Figures' : 'Notable Characters & Cast'}
              </h2>
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
                  <span className="info-channel-name">✦ info</span>
                  <span className="info-channel-badge">Information</span>
                </div>
                <p className="info-channel-desc">
                  Official media overview, details, specifications, and club guidelines.
                </p>
              </div>

              <div
                className="info-channel-card clickable-card"
                onClick={handleGoToGeneral}
                title="Click to jump to ✦ general"
              >
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ general</span>
                  <span className="info-channel-badge">Main Chat</span>
                </div>
                <p className="info-channel-desc">
                  General conversation, first impressions, and meeting fellow members. Spoiler-free!
                </p>
              </div>

              <div className="info-channel-card">
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ spoilers</span>
                  <span className="info-channel-badge">Spoilers</span>
                </div>
                <p className="info-channel-desc">
                  Deep dive into major plot twists, endings, theories, and unreserved spoilers.
                </p>
              </div>

              <div className="info-channel-card">
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ reviews</span>
                  <span className="info-channel-badge">Reviews</span>
                </div>
                <p className="info-channel-desc">
                  Ratings, in-depth critiques, personal analyses, and review discussions.
                </p>
              </div>

              <div className="info-channel-card">
                <div className="info-channel-header">
                  <span className="info-channel-name">✦ requests</span>
                  <span className="info-channel-badge">Member Requests</span>
                </div>
                <p className="info-channel-desc">
                  Member requests, suggestions, and feedback for club moderators.
                </p>
              </div>
            </div>

            {/* Spoiler guidelines */}
            <p className="info-spoiler-guidelines">
              <strong>Spoiler Guidelines:</strong> Keep discussions in <code>✦ general</code> spoiler-free so new viewers and readers can browse safely. All major reveals belong in <code>✦ spoilers</code>.
            </p>
          </div>
        </section>

        {/* Footer Call to Action */}
        <div className="info-footer-cta">
          <div className="info-cta-text">
            <h3>Join the conversation</h3>
            <p>Connect with other fans in <strong>✦ general</strong> to share your thoughts.</p>
          </div>
          <button
            type="button"
            className="info-cta-button"
            onClick={handleGoToGeneral}
          >
            Go to ✦ general channel <span className="cta-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubInfoView;
