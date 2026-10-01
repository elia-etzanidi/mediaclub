import React from 'react';

const LeftPane = ({ activeTab, onTabChange, items, selectedItemId, onSelectItem }) => {
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
        {items.map((item) => (
          <div
            key={item.id}
            className={`list-cell ${selectedItemId === item.id ? 'selected' : ''}`}
            onClick={() => onSelectItem(item)}
          >
            <img src={item.img} alt={item.name} className="cell-image" />
            <span className="cell-name">{item.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftPane;
