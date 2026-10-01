// Authentication API Service

export const registerUser = async ({ username, email, password }) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({
    id: data.userId,
    username: data.username,
    email: data.email,
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

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({
    id: data.userId,
    username: data.username,
    email: data.email,
  }));

  return data;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const getToken = () => localStorage.getItem('token');

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
