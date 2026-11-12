// Club API service with backend integration & local fallback
import defaultAvatar from '../assets/default-avatar.png';

export const getClubFirstLetter = (name) => {
  if (!name || typeof name !== 'string') return 'C';
  const trimmed = name.trim();
  const match = trimmed.match(/[a-zA-Z0-9]/);
  return match ? match[0].toUpperCase() : (trimmed.charAt(0).toUpperCase() || 'C');
};

export const generateClubProfilePicture = (name, mediaType = 'movies') => {
  const letter = getClubFirstLetter(name);
  const typeStr = (mediaType || '').toLowerCase();

  let startColor = '%23005a56';
  let endColor = '%23003836';

  if (typeStr.includes('book')) {
    startColor = '%23f59e0b';
    endColor = '%23b45309';
  } else if (typeStr.includes('tv') || typeStr.includes('show')) {
    startColor = '%233f8f8f';
    endColor = '%23276060';
  } else if (typeStr.includes('game')) {
    startColor = '%23818cf8';
    endColor = '%234f46e5';
  }

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Cdefs%3E%3ClinearGradient id='cg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='${startColor}'/%3E%3Cstop offset='100%25' stop-color='${endColor}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='20' fill='url(%23cg)'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='central' text-anchor='middle' fill='%23fafafa' font-family='system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' font-weight='700' font-size='48'%3E${encodeURIComponent(letter)}%3C/text%3E%3C/svg%3E`;
};

export const normalizeClub = (club) => {
  if (!club || typeof club !== 'object') return null;

  const rawChannels = Array.isArray(club.channels) ? club.channels : [];
  const channels = rawChannels
    .filter(Boolean)
    .map((ch) => ({
      id: ch.id ?? 'info',
      name: ch.name || (ch.type ? String(ch.type).toLowerCase() : 'channel'),
      type: (ch.type || '').toLowerCase() === 'info' ? 'info' : 'text'
    }));

  if (!channels.some((c) => c.id === 'info' || c.type === 'info' || (c.name || '').toLowerCase() === 'info')) {
    channels.unshift({ id: 'info', name: 'info', type: 'info' });
  }

  // Ensure standard channel order: info, general, spoilers, requests, then custom channels
  const standardOrder = ['info', 'general', 'spoilers', 'requests'];
  channels.sort((a, b) => {
    const aName = (a?.name || '').toLowerCase();
    const bName = (b?.name || '').toLowerCase();
    const aIsInfo = a?.type === 'info' || a?.id === 'info' || aName === 'info';
    const bIsInfo = b?.type === 'info' || b?.id === 'info' || bName === 'info';
    const aIdx = aIsInfo ? 0 : standardOrder.indexOf(aName);
    const bIdx = bIsInfo ? 0 : standardOrder.indexOf(bName);

    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  const mediaTypeStr = (club.mediaType || club.type || 'movies').toLowerCase();
  let mediaType = mediaTypeStr;
  if (mediaTypeStr === 'movie') mediaType = 'movies';
  else if (mediaTypeStr === 'book') mediaType = 'books';
  else if (mediaTypeStr === 'show') mediaType = 'tv';
  else if (mediaTypeStr === 'game') mediaType = 'games';

  const clubName = club.name || club.title || 'Club';
  const rawCover = club.coverImageUrl || club.img || club.photo || club.coverLarge;
  const hasCover = Boolean(rawCover && rawCover !== '/default-club.png' && typeof rawCover === 'string' && rawCover.trim());
  const coverUrl = hasCover ? rawCover.trim() : generateClubProfilePicture(clubName, mediaType);

  const rawMembers = Array.isArray(club.members) ? club.members : [];
  const members = rawMembers.filter(Boolean).map((m) => {
    const isOnline = m.status === 'ONLINE' || m.status === 'Online' || m.isOnline === true;
    const roleStr = typeof m.role === 'string' ? m.role.toLowerCase() : 'member';
    return {
      id: m.id || m.userId,
      name: m.name || m.username || 'Member',
      username: m.username || m.name || 'Member',
      img: m.img || m.avatarUrl || defaultAvatar,
      avatarUrl: m.avatarUrl || m.img || defaultAvatar,
      role: roleStr,
      status: isOnline ? 'Online' : 'Offline',
      isOnline
    };
  });

  return {
    id: club.id,
    name: clubName,
    mediaType,
    externalSource: club.externalSource || (mediaType === 'books' ? 'OPEN_LIBRARY' : 'TMDB'),
    externalId: club.externalId ? String(club.externalId) : (club.id ? String(club.id) : null),
    img: coverUrl,
    coverImageUrl: coverUrl,
    photo: coverUrl,
    backdrop: club.backdrop || null,
    description: club.description || '',
    year: club.releaseDate || club.year || '',
    genre: club.genre || '',
    author: club.author || '',
    channels,
    members,
    memberCount: club.memberCount || members.length || 1,
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

export const fetchClubApi = async (clubId) => {
  const token = localStorage.getItem('token');
  const numId = Number(clubId);
  if (!token || !clubId || isNaN(numId)) return null;

  try {
    const res = await fetch(`/api/clubs/${numId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      return normalizeClub(data);
    }
  } catch (err) {
    console.warn('Backend fetchClubApi failed:', err);
  }
  return null;
};

export const fetchClubMembersApi = async (clubId) => {
  const token = localStorage.getItem('token');
  const numId = Number(clubId);
  if (!token || !clubId || isNaN(numId)) return null;

  try {
    const res = await fetch(`/api/clubs/${numId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.map((m) => {
          const isOnline = m.status === 'ONLINE' || m.status === 'Online' || m.isOnline === true;
          return {
            id: m.userId || m.id,
            name: m.username || m.name,
            username: m.username || m.name,
            img: m.avatarUrl || m.img || defaultAvatar,
            avatarUrl: m.avatarUrl || m.img || defaultAvatar,
            role: (m.role || 'member').toLowerCase(),
            status: isOnline ? 'Online' : 'Offline',
            isOnline
          };
        });
      }
    }
  } catch (err) {
    console.warn('Backend fetchClubMembersApi failed:', err);
  }
  return null;
};

export const joinClubApi = async (clubId) => {
  const token = localStorage.getItem('token');
  const numId = Number(clubId);
  if (!token || !clubId || isNaN(numId)) return null;

  try {
    const res = await fetch(`/api/clubs/${numId}/join`, {
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

  const clubName = clubData.name || clubData.title || 'Club';
  const rawCover = clubData.coverImageUrl || clubData.photo || clubData.img || clubData.coverLarge || '';
  const hasCover = Boolean(rawCover && rawCover.trim() && rawCover !== '/default-club.png');
  const coverImageUrl = hasCover
    ? rawCover.trim()
    : generateClubProfilePicture(clubName, clubData.mediaType || clubData.type);

  try {
    const res = await fetch('/api/clubs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: clubName,
        mediaType: mediaTypeEnum,
        externalSource: sourceEnum,
        externalId: String(clubData.externalId || clubData.id || Date.now()),
        coverImageUrl,
        description: (clubData.description || clubData.plot || '').slice(0, 1900),
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
  const numId = Number(clubId);
  if (!token || !clubId || isNaN(numId)) return null;

  try {
    const res = await fetch(`/api/clubs/${numId}/channels`, {
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
  const numId = Number(channelId);
  if (!token || !channelId || isNaN(numId)) return false;

  try {
    const res = await fetch(`/api/clubs/channels/${numId}`, {
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
  const numId = Number(clubId);
  if (!token || !clubId || isNaN(numId)) return false;

  try {
    const res = await fetch(`/api/clubs/${numId}/leave`, {
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
  const numId = Number(clubId);
  const numUserId = Number(targetUserId);
  if (!token || !clubId || isNaN(numId) || !targetUserId || isNaN(numUserId)) return false;

  try {
    const res = await fetch(`/api/clubs/${numId}/members/${numUserId}/promote`, {
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

export const demoteMemberApi = async (clubId, targetUserId) => {
  const token = localStorage.getItem('token');
  const numId = Number(clubId);
  const numUserId = Number(targetUserId);
  if (!token || !clubId || isNaN(numId) || !targetUserId || isNaN(numUserId)) return false;

  try {
    const res = await fetch(`/api/clubs/${numId}/members/${numUserId}/demote`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.ok;
  } catch (err) {
    console.warn('Backend demoteMemberApi request failed:', err);
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
