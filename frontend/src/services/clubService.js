// Club API service with backend integration & local fallback

export const createChannelApi = async (clubId, { name, type }) => {
  const token = localStorage.getItem('token');
  if (!token || !clubId || typeof clubId !== 'number') return null;

  try {
    const res = await fetch(`/api/clubs/${clubId}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, type: type === 'info' ? 'INFO' : 'TEXT' })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend createChannelApi request failed:', err);
  }
  return null;
};

export const deleteChannelApi = async (channelId) => {
  const token = localStorage.getItem('token');
  if (!token || !channelId || typeof channelId !== 'number') return false;

  try {
    const res = await fetch(`/api/clubs/channels/${channelId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend deleteChannelApi request failed:', err);
  }
  return false;
};

export const leaveClubApi = async (clubId) => {
  const token = localStorage.getItem('token');
  if (!token || !clubId || typeof clubId !== 'number') return false;

  try {
    const res = await fetch(`/api/clubs/${clubId}/leave`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend leaveClubApi request failed:', err);
  }
  return false;
};

export const promoteMemberApi = async (clubId, targetUserId) => {
  const token = localStorage.getItem('token');
  if (!token || !clubId || !targetUserId) return false;

  try {
    const res = await fetch(`/api/clubs/${clubId}/members/${targetUserId}/promote`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend promoteMemberApi request failed:', err);
  }
  return false;
};

export const kickMemberApi = async (clubId, targetUserId) => {
  const token = localStorage.getItem('token');
  if (!token || !clubId || !targetUserId) return false;

  try {
    const res = await fetch(`/api/clubs/${clubId}/members/${targetUserId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend kickMemberApi request failed:', err);
  }
  return false;
};
