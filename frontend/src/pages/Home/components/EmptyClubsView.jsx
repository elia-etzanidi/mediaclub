import React from 'react';
import './EmptyClubsView.css';

const EmptyClubsView = ({ onFocusSearch }) => {
  return (
    <div className="empty-clubs-wrapper">
      <div className="empty-clubs-content">
        {/* Custom SVG Illustration */}
        <div className="empty-clubs-illustration-container">
          <svg
            className="empty-clubs-svg"
            viewBox="0 0 220 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradientTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#004643" />
                <stop offset="100%" stopColor="#357979" />
              </linearGradient>
              <linearGradient id="gradientAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bad3ce" />
                <stop offset="100%" stopColor="#eaf2f1" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#004643" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Ambient Background Aura */}
            <circle cx="110" cy="80" r="65" fill="#bad3ce" opacity="0.25" />

            {/* Left Item: Movie Clapperboard (Floating) */}
            <g className="floating-element-1" filter="url(#softGlow)">
              <rect x="25" y="55" width="48" height="42" rx="6" fill="#004643" />
              {/* Clapper Top Angle */}
              <path d="M23 45 L73 40 L71 52 L21 57 Z" fill="#357979" />
              <line x1="33" y1="44" x2="31" y2="55" stroke="#fafafa" strokeWidth="2.5" />
              <line x1="48" y1="42" x2="46" y2="53" stroke="#fafafa" strokeWidth="2.5" />
              <line x1="63" y1="41" x2="61" y2="52" stroke="#fafafa" strokeWidth="2.5" />
              <circle cx="49" cy="76" r="8" fill="#bad3ce" opacity="0.6" />
              <polygon points="47,72 53,76 47,80" fill="#004643" />
            </g>

            {/* Right Item: Open Book (Floating) */}
            <g className="floating-element-2" filter="url(#softGlow)">
              <path
                d="M142 58 C155 53, 172 55, 185 60 L185 96 C172 91, 155 89, 142 94 Z"
                fill="#bad3ce"
              />
              <path
                d="M142 58 C129 53, 112 55, 99 60 L99 96 C112 91, 129 89, 142 94 Z"
                fill="#eaf2f1"
              />
              <path d="M142 58 L142 94" stroke="#004643" strokeWidth="2" strokeLinecap="round" />
              <line x1="150" y1="67" x2="175" y2="72" stroke="#357979" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="150" y1="76" x2="172" y2="81" stroke="#357979" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="109" y1="72" x2="134" y2="67" stroke="#357979" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="112" y1="81" x2="134" y2="76" stroke="#357979" strokeWidth="1.5" strokeLinecap="round" />
              {/* Bookmark Ribbon */}
              <path d="M142 58 L142 102 L146 98 L150 102 L150 59" fill="#004643" />
            </g>

            {/* Center Front: Magnifying Glass Lens with Search Focus */}
            <g className="floating-element-3" filter="url(#softGlow)">
              <circle cx="110" cy="80" r="30" fill="#fafafa" stroke="#004643" strokeWidth="5" />
              <circle cx="110" cy="80" r="24" fill="url(#gradientAccent)" opacity="0.4" />
              {/* Glass Glare */}
              <path
                d="M93 72 C96 64, 105 60, 115 62"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Handle */}
              <line x1="131" y1="101" x2="152" y2="122" stroke="#004643" strokeWidth="7" strokeLinecap="round" />
              <line x1="134" y1="104" x2="149" y2="119" stroke="#357979" strokeWidth="3" strokeLinecap="round" />
              {/* Center Media Club star */}
              <polygon
                points="110,69 113,76 120,77 115,82 116,89 110,85 104,89 105,82 100,77 107,76"
                fill="#004643"
              />
            </g>

            {/* Sparkles */}
            <g className="sparkle-pulse">
              <path d="M40 30 Q40 37 47 37 Q40 37 40 44 Q40 37 33 37 Q40 37 40 30 Z" fill="#d97706" />
              <path d="M178 35 Q178 40 183 40 Q178 40 178 45 Q178 40 173 40 Q178 40 178 35 Z" fill="#d97706" />
              <circle cx="80" cy="28" r="2.5" fill="#357979" />
              <circle cx="160" cy="120" r="2" fill="#bad3ce" />
            </g>
          </svg>
        </div>

        <span className="empty-badge">Welcome to Media Club</span>
        <h2 className="empty-title">You haven't joined any clubs yet</h2>
        <p className="empty-description">
          Each movie, TV show, or book has one dedicated club. Use the search bar
          above to find and join existing clubs, or be the first to start the club for any title!
        </p>

        {/* Primary CTA Button */}
        <div className="empty-cta-action-box">
          <button className="empty-cta-button" onClick={onFocusSearch}>
            <svg
              className="empty-cta-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search & Explore Clubs</span>
          </button>
          <span className="empty-cta-hint">Or click any popular title below to start searching instantly</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyClubsView;
