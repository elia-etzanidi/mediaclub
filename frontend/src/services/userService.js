// User Account Service - fetches or constructs user account details
import defaultAvatar from '../assets/default-avatar.png';

const PRESET_USERS = {
  'alice smith': {
    username: 'Alice Smith',
    handle: 'alicesmith',
    email: 'alice.smith@example.com',
    createdAt: 'October 15, 2023',
    status: 'Online',
    clubs: ['Inception', 'Stranger Things']
  },
  'bob jones': {
    username: 'Bob Jones',
    handle: 'bobjones',
    email: 'bob.jones@example.com',
    createdAt: 'January 8, 2024',
    status: 'Online',
    clubs: ['Inception', 'Breaking Bad']
  },
  'charlie day': {
    username: 'Charlie Day',
    handle: 'charlieday',
    email: 'charlie.day@example.com',
    createdAt: 'February 20, 2024',
    status: 'Online',
    clubs: ['Inception']
  },
  'diana prince': {
    username: 'Diana Prince',
    handle: 'dianaprince',
    email: 'diana.prince@example.com',
    createdAt: 'November 4, 2023',
    status: 'Online',
    clubs: ['Breaking Bad', 'Stranger Things']
  },
  'evan wright': {
    username: 'Evan Wright',
    handle: 'evanwright',
    email: 'evan.wright@example.com',
    createdAt: 'March 18, 2024',
    status: 'Active',
    clubs: ['Breaking Bad']
  },
  'fiona gallagher': {
    username: 'Fiona Gallagher',
    handle: 'fionagallagher',
    email: 'fiona.gallagher@example.com',
    createdAt: 'April 2, 2024',
    status: 'Active',
    clubs: ['Breaking Bad', 'The Hobbit']
  },
  'demouser': {
    username: 'DemoUser',
    handle: 'demouser',
    email: 'demouser@example.com',
    createdAt: 'October 15, 2023',
    status: 'Online',
    clubs: ['Inception', 'Breaking Bad']
  }
};

const formatDate = (dateVal) => {
  if (!dateVal) return 'Recently';
  try {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
  } catch (e) {
    // ignore
  }
  return String(dateVal);
};

export const fetchUserAccountDetails = async (inputUser, club = null, currentUser = null) => {
  if (!inputUser) return null;

  const rawName = inputUser.username || inputUser.name || 'Member';
  const rawId = inputUser.id || inputUser.senderId || null;
  const rawAvatar = inputUser.avatarUrl || inputUser.pfp || inputUser.img || defaultAvatar;
  const rawRole = inputUser.role || (inputUser.isModerator ? 'moderator' : 'member');

  const normalizedKey = rawName.trim().toLowerCase();
  const isSelf = Boolean(
    currentUser &&
    ((currentUser.id && rawId && currentUser.id === rawId) ||
      (currentUser.username && currentUser.username.toLowerCase() === normalizedKey))
  );

  // If this is the current user, merge current user info
  if (isSelf && currentUser) {
    return {
      id: currentUser.id || rawId,
      username: currentUser.username || rawName,
      handle: (currentUser.username || rawName).toLowerCase().replace(/[^a-z0-9_]/g, ''),
      email: currentUser.email || `${normalizedKey.replace(/\s+/g, '.')}@example.com`,
      avatarUrl: currentUser.pfp || currentUser.avatarUrl || rawAvatar,
      role: rawRole,
      createdAt: formatDate(currentUser.createdAt || 'October 15, 2023'),
      status: 'Online',
      bio: currentUser.bio || null,
      clubs: club?.name ? [club.name] : ['Inception'],
      isCurrentUser: true
    };
  }

  // Check preset users
  const preset = PRESET_USERS[normalizedKey];

  // Try fetching real user profile from backend if token exists
  const token = localStorage.getItem('token');
  let backendData = null;

  if (token) {
    try {
      const endpoint = rawId && typeof rawId === 'number'
        ? `/api/users/${rawId}`
        : `/api/users/by-username/${encodeURIComponent(rawName)}`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        backendData = await res.json();
      }
    } catch (err) {
      // Ignore network/auth error and fallback to preset/mock
    }
  }

  const effectiveAvatar =
    backendData?.avatarUrl ||
    (rawAvatar && !rawAvatar.includes('via.placeholder.com') ? rawAvatar : defaultAvatar);

  const cleanHandle = (backendData?.username || rawName)
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

  const clubName = club?.name || null;
  const userClubs = preset?.clubs
    ? (clubName && !preset.clubs.includes(clubName) ? [clubName, ...preset.clubs] : preset.clubs)
    : clubName
      ? [clubName]
      : ['MediaClub'];

  const memberStatus =
    backendData?.status ||
    inputUser.status ||
    (inputUser.isOnline !== undefined ? (inputUser.isOnline ? 'Online' : 'Offline') : null) ||
    preset?.status ||
    'Offline';

  return {
    id: backendData?.id || rawId || normalizedKey,
    username: backendData?.username || preset?.username || rawName,
    handle: cleanHandle,
    email: backendData?.email || preset?.email || `${cleanHandle}@example.com`,
    avatarUrl: effectiveAvatar,
    role: rawRole,
    createdAt: formatDate(backendData?.createdAt || preset?.createdAt || 'January 2024'),
    status: memberStatus,
    bio: backendData?.bio || preset?.bio || null,
    clubs: userClubs,
    isCurrentUser: false
  };
};
