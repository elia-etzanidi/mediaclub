import React from 'react';

const LeftPane = ({
  activeTab,
  onTabChange,
  items,
  selectedItemId,
  onSelectItem,
  onFocusSearch
}) => {
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

      <div className="scrollable-list">
        {items.length === 0 ? (
          <div className="left-pane-empty">
            <div className="left-pane-empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="left-pane-empty-title">
              {activeTab === 'clubs' ? 'No clubs yet' : 'No direct messages'}
            </div>
            <p className="left-pane-empty-text">
              {activeTab === 'clubs'
                ? 'Join or create one using search above'
                : 'Start a conversation with someone'}
            </p>
            {activeTab === 'clubs' && onFocusSearch && (
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
          items.map((item) => (
            <div
              key={item.id}
              className={`list-cell ${selectedItemId === item.id ? 'selected' : ''}`}
              onClick={() => onSelectItem(item)}
            >
              <img src={item.img} alt={item.name} className="cell-image" />
              <span className="cell-name">{item.name}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default LeftPane;
