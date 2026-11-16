// User Account Service - fetches or constructs user account details
import defaultAvatar from '../assets/default-avatar.png';

export const PRESET_USERS = {
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

export const findPresetUser = (query) => {
  if (!query) return null;
  const clean = query.replace(/^@/, '').trim().toLowerCase();
  const cleanNoSpaces = clean.replace(/[\s._-]+/g, '');

  for (const [key, preset] of Object.entries(PRESET_USERS)) {
    const pKey = key.toLowerCase();
    const pUsername = (preset.username || '').toLowerCase();
    const pHandle = (preset.handle || '').toLowerCase();
    const pCleanKey = pKey.replace(/[\s._-]+/g, '');
    const pCleanUsername = pUsername.replace(/[\s._-]+/g, '');

    if (
      clean === pKey ||
      clean === pUsername ||
      clean === pHandle ||
      cleanNoSpaces === pCleanKey ||
      cleanNoSpaces === pCleanUsername ||
      cleanNoSpaces === pHandle
    ) {
      return preset;
    }
  }
  return null;
};

// In-memory cache for user account existence lookups
const userExistsCache = new Map();

/**
 * Resolves a username or mention tag to an existing account.
 * Returns null if the user account does not exist.
 */
export const resolveUserAccount = async (usernameOrUser, club = null, currentUser = null) => {
  if (!usernameOrUser) return null;

  // If already an existing user object with valid id/properties
  if (typeof usernameOrUser === 'object' && usernameOrUser.id && (usernameOrUser.username || usernameOrUser.name)) {
    return usernameOrUser;
  }

  const rawName = typeof usernameOrUser === 'string'
    ? usernameOrUser.replace(/^@/, '').trim()
    : (usernameOrUser.username || usernameOrUser.name || '').replace(/^@/, '').trim();

  if (!rawName) return null;
  const lowerName = rawName.toLowerCase();
  const lowerNoSpaces = lowerName.replace(/[\s._-]+/g, '');

  // 1. Check current user
  if (currentUser) {
    const curU = (currentUser.username || '').toLowerCase();
    const curN = (currentUser.name || '').toLowerCase();
    if (
      lowerName === curU ||
      lowerName === curN ||
      lowerNoSpaces === curU.replace(/[\s._-]+/g, '') ||
      lowerNoSpaces === curN.replace(/[\s._-]+/g, '')
    ) {
      return {
        id: currentUser.id,
        username: currentUser.username || currentUser.name,
        name: currentUser.username || currentUser.name,
        avatarUrl: currentUser.pfp || currentUser.avatarUrl || defaultAvatar,
        role: currentUser.role || 'member',
        isCurrentUser: true
      };
    }
  }

  // 2. Check current club members if club provided
  if (club && Array.isArray(club.members)) {
    const foundMember = club.members.find((m) => {
      const mU = (m.username || '').toLowerCase();
      const mN = (m.name || '').toLowerCase();
      return (
        mU === lowerName ||
        mN === lowerName ||
        mU.replace(/[\s._-]+/g, '') === lowerNoSpaces ||
        mN.replace(/[\s._-]+/g, '') === lowerNoSpaces
      );
    });
    if (foundMember) {
      return foundMember;
    }
  }

  // 3. Check preset users
  const preset = findPresetUser(rawName);
  if (preset) {
    return {
      username: preset.username,
      name: preset.username,
      handle: preset.handle,
      status: preset.status,
      avatarUrl: defaultAvatar
    };
  }

  // 4. Check cache for quick resolution
  if (userExistsCache.has(lowerName)) {
    return userExistsCache.get(lowerName);
  }

  // 5. Check backend API by username
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await fetch(`/api/users/by-username/${encodeURIComponent(rawName)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.id || data.username)) {
          const resolved = {
            id: data.id,
            username: data.username,
            name: data.username,
            avatarUrl: data.avatarUrl || defaultAvatar,
            status: data.status,
            createdAt: data.createdAt
          };
          userExistsCache.set(lowerName, resolved);
          return resolved;
        }
      } else if (res.status === 404) {
        userExistsCache.set(lowerName, null);
        return null;
      }
    } catch (e) {
      // ignore
    }
  }

  return null;
};

export const fetchUserAccountDetails = async (inputUser, club = null, currentUser = null) => {
  if (!inputUser) return null;

  const rawName = (inputUser.username || inputUser.name || '').replace(/^@/, '').trim();
  const rawId = inputUser.id || inputUser.senderId || null;
  const rawAvatar = inputUser.avatarUrl || inputUser.pfp || inputUser.img || defaultAvatar;
  const rawRole = inputUser.role || (inputUser.isModerator ? 'moderator' : 'member');

  const normalizedKey = rawName.toLowerCase();
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
  const preset = PRESET_USERS[normalizedKey] || findPresetUser(rawName);

  // Try fetching real user profile from backend if token exists
  const token = localStorage.getItem('token');
  let backendData = null;

  if (token) {
    try {
      const endpoint = rawId && typeof rawId === 'number'
        ? `/api/users/${rawId}`
        : (rawName ? `/api/users/by-username/${encodeURIComponent(rawName)}` : null);

      if (endpoint) {
        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          backendData = await res.json();
        }
      }
    } catch (err) {
      // Ignore network/auth error and fallback to preset/mock
    }
  }

  // Check if member belongs to current club
  const clubMember = club && Array.isArray(club.members)
    ? club.members.find(m => (m.username || m.name || '').toLowerCase() === normalizedKey || (rawId && m.id === rawId))
    : null;

  // If the user does not exist in backend, is not preset, is not current user, and is not a club member:
  const accountExists = Boolean(
    backendData ||
    preset ||
    clubMember ||
    (rawId && typeof rawId === 'number')
  );

  if (!accountExists) {
    return null;
  }

  const effectiveAvatar =
    backendData?.avatarUrl ||
    (rawAvatar && !rawAvatar.includes('via.placeholder.com') ? rawAvatar : defaultAvatar);

  const cleanHandle = (backendData?.username || preset?.handle || rawName)
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
    username: backendData?.username || preset?.username || clubMember?.username || clubMember?.name || rawName,
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
