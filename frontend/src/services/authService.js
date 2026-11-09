import { websocketService } from './websocketService';

export const clearLocalSession = () => {
  try {
    websocketService.disconnect();
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('mediaclub_') || key === 'token' || key === 'user')) {
        if (key === 'tmdb_api_key') continue;
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.warn('Error clearing local session:', e);
  }
};

export const registerUser = async ({ username, email, password }) => {
  // Clear any leftover data from a previous session so new accounts start fresh
  clearLocalSession();

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  if (data.token) {
    localStorage.setItem('token', data.token);
    websocketService.connect();
  }
  const avatar = data.avatarUrl || '/default-avatar.png';
  localStorage.setItem('user', JSON.stringify({
    id: data.userId,
    username: data.username,
    email: data.email,
    avatarUrl: avatar,
    pfp: avatar,
  }));

  return data;
};

export const loginUser = async ({ username, password }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Invalid credentials');
  }

  // Clear previous session if switching accounts
  const prevUser = getCurrentUser();
  if (prevUser && prevUser.id !== data.userId) {
    clearLocalSession();
  }

  localStorage.setItem('token', data.token);
  websocketService.connect();
  const avatar = data.avatarUrl || '/default-avatar.png';
  localStorage.setItem('user', JSON.stringify({
    id: data.userId,
    username: data.username,
    email: data.email,
    avatarUrl: avatar,
    pfp: avatar,
  }));

  return data;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    const parsed = JSON.parse(userStr);
    const isPlaceholder = (val) => !val || val.includes('via.placeholder.com');
    if (isPlaceholder(parsed.pfp)) {
      parsed.pfp = '/default-avatar.png';
    }
    if (isPlaceholder(parsed.avatarUrl)) {
      parsed.avatarUrl = '/default-avatar.png';
    }
    return parsed;
  } catch {
    return null;
  }
};

export const updateStoredUser = (updatedFields) => {
  const current = getCurrentUser() || {};
  const merged = { ...current, ...updatedFields };
  localStorage.setItem('user', JSON.stringify(merged));
  return merged;
};

export const updateUserAvatar = async (avatarUrl) => {
  const token = getToken();
  if (token) {
    const response = await fetch('/api/users/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ avatarUrl }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to save avatar on server');
    }

    const data = await response.json();
    return updateStoredUser({
      avatarUrl: data.avatarUrl,
      pfp: data.avatarUrl,
    });
  }

  // Fallback if no auth token (guest/demo mode)
  return updateStoredUser({
    avatarUrl,
    pfp: avatarUrl,
  });
};

export const getUserProfile = async () => {
  const token = getToken();
  if (!token) return getCurrentUser();

  try {
    const response = await fetch('/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return updateStoredUser({
        id: data.id,
        username: data.username,
        email: data.email,
        avatarUrl: data.avatarUrl || '/default-avatar.png',
        pfp: data.avatarUrl || '/default-avatar.png',
        createdAt: data.createdAt,
      });
    }
  } catch (err) {
    console.warn('Could not fetch user profile:', err);
  }
  return getCurrentUser();
};

export const getToken = () => localStorage.getItem('token');

export const logoutUser = () => {
  clearLocalSession();
};
