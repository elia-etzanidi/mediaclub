import React, { useMemo } from 'react';
import { getLatestDmSnippet, sortChatsByRecency } from '../../../services/directMessageService';
import { generateClubProfilePicture } from '../../../services/clubService';
import defaultAvatar from '../../../assets/default-avatar.png';

const LeftPane = ({
  activeTab,
  onTabChange,
  items,
  selectedItemId,
  onSelectItem,
  onFocusSearch,
  onOpenStartDmModal,
  dmUpdateTick
}) => {
  const displayItems = useMemo(() => {
    if (activeTab === 'people') {
      return sortChatsByRecency(items);
    }
    return items;
  }, [items, activeTab, dmUpdateTick]);

  return (
    <aside className="left-pane">
      <div className="list-header">
        <button
          className={`tab-button ${activeTab === 'clubs' ? 'active' : ''}`}
          onClick={() => onTabChange('clubs')}
        >
          Clubs
        </button>
        <button
          className={`tab-button ${activeTab === 'people' ? 'active' : ''}`}
          onClick={() => onTabChange('people')}
        >
          People
        </button>
      </div>

      {activeTab === 'people' && (
        <div className="left-pane-sub-header">
          <span className="left-pane-sub-title">DIRECT MESSAGES</span>
          {onOpenStartDmModal && (
            <button
              type="button"
              className="left-pane-add-dm-btn"
              onClick={onOpenStartDmModal}
              title="Start a new direct message"
              aria-label="Start a new direct message"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>New</span>
            </button>
          )}
        </div>
      )}

      <div className="scrollable-list">
        {activeTab === 'clubs' && displayItems.length === 0 ? (
          <div className="left-pane-empty">
            <div className="left-pane-empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="left-pane-empty-title">
              No clubs yet
            </div>
            <p className="left-pane-empty-text">
              Join or create one using search above
            </p>
            {onFocusSearch && (
              <button
                type="button"
                className="left-pane-empty-btn"
                onClick={onFocusSearch}
              >
                + Find Clubs
              </button>
            )}
          </div>
        ) : (
          displayItems.map((item) => {
            const isSelected = selectedItemId != null && String(selectedItemId) === String(item.id);
            const snippet = activeTab === 'people'
              ? getLatestDmSnippet(item) || (item.lastMessage ? { content: item.lastMessage } : null)
              : null;

            return (
              <div
                key={item.id}
                className={`list-cell ${isSelected ? 'selected' : ''} ${activeTab === 'people' ? 'dm-list-cell' : ''}`}
                onClick={() => onSelectItem(item)}
              >
                <div className="cell-image-wrapper">
                  <img
                    src={
                      item.img ||
                      (activeTab === 'clubs'
                        ? generateClubProfilePicture(item.name, item.mediaType)
                        : defaultAvatar)
                    }
                    alt={item.name}
                    className="cell-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = activeTab === 'clubs'
                        ? generateClubProfilePicture(item.name, item.mediaType)
                        : defaultAvatar;
                    }}
                  />
                  {activeTab === 'people' && (
                    <span
                      className={`cell-online-dot ${
                        item.isOnline || (item.status && item.status.toLowerCase().includes('online'))
                          ? 'is-online'
                          : 'is-offline'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="cell-info-wrap">
                  <span className="cell-name">{item.name}</span>
                  {snippet && snippet.content && (
                    <span className="cell-snippet" title={snippet.content.replace(/\|\|/g, '')}>
                      {snippet.content.replace(/\r?\n+/g, ' ').replace(/\|\|/g, '').trim()}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default LeftPane;
