import React from 'react';

const DirectMessageView = ({ person }) => {
  return (
    <div className="dm-view-placeholder">
      <h2>Direct Message with {person?.name || 'User'}</h2>
    </div>
  );
};

export default DirectMessageView;
