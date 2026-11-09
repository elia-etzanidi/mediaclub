// Club API service with backend integration & local fallback
import defaultAvatar from '../assets/default-avatar.png';

export const normalizeClub = (club) => {
  if (!club) return null;

  const channels = (club.channels || []).map((ch) => ({
    id: ch.id,
    name: ch.name,
    type: (ch.type || '').toLowerCase() === 'info' ? 'info' : 'text'
  }));

  if (!channels.some((c) => c.id === 'info' || c.type === 'info')) {
    channels.unshift({ id: 'info', name: 'info', type: 'info' });
  }

  const mediaTypeStr = (club.mediaType || 'movies').toLowerCase();
  let mediaType = mediaTypeStr;
  if (mediaTypeStr === 'movie') mediaType = 'movies';
  else if (mediaTypeStr === 'book') mediaType = 'books';
  else if (mediaTypeStr === 'show') mediaType = 'tv';
  else if (mediaTypeStr === 'game') mediaType = 'games';

  return {
    id: club.id,
    name: club.name,
    mediaType,
    externalSource: club.externalSource,
    externalId: club.externalId,
    img: club.coverImageUrl || club.img || club.photo || club.coverLarge || '/default-club.png',
    coverImageUrl: club.coverImageUrl || club.img,
    backdrop: club.backdrop || null,
    description: club.description || '',
    year: club.releaseDate || club.year || '',
    genre: club.genre || '',
    author: club.author || '',
    channels,
    members: club.members || [],
    memberCount: club.memberCount || club.members?.length || 1,
    mediaDetails: club.mediaDetails || null
  };
};

export const fetchMyClubsApi = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await fetch('/api/clubs/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map(normalizeClub);
      }
    }
  } catch (err) {
    console.warn('Backend fetchMyClubsApi failed:', err);
  }
  return null;
};

export const fetchAllClubsApi = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await fetch('/api/clubs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map(normalizeClub);
      }
    }
  } catch (err) {
    console.warn('Backend fetchAllClubsApi failed:', err);
  }
  return null;
};

export const fetchClubMembersApi = async (clubId) => {
  const token = localStorage.getItem('token');
  if (!token || !clubId || typeof clubId !== 'number') return null;

  try {
    const res = await fetch(`/api/clubs/${clubId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((m) => ({
          id: m.userId,
          name: m.username,
          username: m.username,
          img: m.avatarUrl || defaultAvatar,
          role: (m.role || 'member').toLowerCase()
        }));
      }
    }
  } catch (err) {
    console.warn('Backend fetchClubMembersApi failed:', err);
  }
  return null;
};

export const joinClubApi = async (clubId) => {
  const token = localStorage.getItem('token');
  if (!token || !clubId || typeof clubId !== 'number') return null;

  try {
    const res = await fetch(`/api/clubs/${clubId}/join`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend joinClubApi failed:', err);
  }
  return null;
};

export const createClubApi = async (clubData) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  let mediaTypeEnum = 'MOVIE';
  const typeStr = (clubData.mediaType || clubData.type || 'movies').toLowerCase();
  if (typeStr.includes('book')) mediaTypeEnum = 'BOOK';
  else if (typeStr.includes('tv') || typeStr.includes('show')) mediaTypeEnum = 'SHOW';
  else if (typeStr.includes('game')) mediaTypeEnum = 'GAME';

  let sourceEnum = 'TMDB';
  if (mediaTypeEnum === 'BOOK') sourceEnum = 'OPEN_LIBRARY';
  else if (mediaTypeEnum === 'GAME') sourceEnum = 'RAWG';
  if (clubData.externalSource) {
    sourceEnum = clubData.externalSource.toUpperCase();
  }

  try {
    const res = await fetch('/api/clubs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: clubData.name || clubData.title,
        mediaType: mediaTypeEnum,
        externalSource: sourceEnum,
        externalId: String(clubData.externalId || clubData.id || Date.now()),
        coverImageUrl: clubData.coverImageUrl || clubData.photo || clubData.img || clubData.coverLarge || '',
        description: clubData.description || clubData.plot || '',
        releaseDate: String(clubData.year || clubData.releaseDate || '')
      })
    });
    if (res.ok) {
      const data = await res.json();
      return normalizeClub(data);
    }
  } catch (err) {
    console.warn('Backend createClubApi failed:', err);
  }
  return null;
};

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
