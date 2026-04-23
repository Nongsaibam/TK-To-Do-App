const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const AUTH_KEY = 'modern-taskflow-auth';

function getStoredAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
  } catch {
    return null;
  }
}

export function loadAuthSession() {
  return getStoredAuth();
}

export function saveAuthSession(session) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}

async function apiRequest(path, options = {}) {
  const session = getStoredAuth();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Backend request failed');
  }

  return data;
}

export const authApi = {
  async login(payload) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    saveAuthSession({ token: data.token, user: data.user });
    return data;
  },
  async register(payload) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    saveAuthSession({ token: data.token, user: data.user });
    return data;
  },
  async socialLogin(provider) {
    try {
      const data = await apiRequest('/auth/social', {
        method: 'POST',
        body: JSON.stringify({ provider }),
      });
      saveAuthSession({ token: data.token, user: data.user });
      return data;
    } catch {
      const user = {
        id: Date.now(),
        name: `${provider} User`,
        email: `${provider.toLowerCase()}.user@taskflow.local`,
        role: 'Member',
        firstName: provider,
        lastName: 'User',
        contactNumber: '',
        position: `${provider} Account`,
        provider,
        joinedAt: new Date().toISOString().slice(0, 10),
      };
      const data = {
        success: true,
        message: `${provider} login successful`,
        token: `local-${provider.toLowerCase()}-social-token`,
        user,
      };
      saveAuthSession({ token: data.token, user });
      return data;
    }
  },
  async updateProfile(payload) {
    const data = await apiRequest('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    const session = getStoredAuth();
    saveAuthSession({ token: session?.token, user: data.user });
    return data;
  },
  async changePassword(payload) {
    return apiRequest('/auth/password', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  logout() {
    clearAuthSession();
  },
};

export const taskApi = {
  async list() {
    return apiRequest('/tasks');
  },
  async create(payload) {
    return apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async update(id, payload) {
    return apiRequest(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async remove(id) {
    return apiRequest(`/tasks/${id}`, { method: 'DELETE' });
  },
};

export const analyticsApi = {
  async get() {
    return apiRequest('/analytics');
  },
};

export const aiApi = {
  async ask(prompt) {
    return apiRequest('/ai/assistant', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  },
};

export const memberApi = {
  async list() {
    return apiRequest('/members');
  },
  async invite(payload) {
    return apiRequest('/members', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async update(id, payload) {
    return apiRequest(`/members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
};
