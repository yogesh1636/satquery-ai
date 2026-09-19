// Centralized Authentication & Role Persistence State Manager

const AUTH_KEY = 'satquery_is_authenticated';
const ROLE_KEY = 'satquery_user_role';
const FALLBACK_ROLE_KEY = 'satquery_role';
const USER_PROFILE_KEY = 'satquery_user_profile';
const TIMEOUT_KEY = 'satquery_inactivity_timeout';
const SESSIONS_KEY = 'satquery_active_sessions';
const API_KEYS_KEY = 'satquery_api_keys';
const PENDING_REG_KEY = 'satquery_pending_registration';

const INITIAL_SESSIONS = [
  {
    id: 'sess-current',
    device: 'Chrome on Windows 11 (This Device)',
    ip: '192.168.1.104 (New Delhi, IN)',
    lastActive: 'Active now',
    isCurrent: true
  },
  {
    id: 'sess-mobile-1',
    device: 'SatQuery Companion App — iOS 18',
    ip: '49.207.215.12 (New Delhi, IN)',
    lastActive: '2 hours ago',
    isCurrent: false
  },
  {
    id: 'sess-mac-1',
    device: 'Safari on macOS Sonoma',
    ip: '103.21.124.9 (Bangalore, IN)',
    lastActive: 'Yesterday at 18:45',
    isCurrent: false
  }
];

const INITIAL_API_KEYS = [
  {
    id: 'key-1',
    name: 'QGIS Export Automation Key',
    prefix: 'sq_live_9a8f...',
    created: '2026-09-01',
    lastUsed: '3 hours ago'
  },
  {
    id: 'key-2',
    name: 'Python SDK Data Fetcher',
    prefix: 'sq_live_3e1b...',
    created: '2026-08-15',
    lastUsed: 'Yesterday'
  }
];

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const getUserRole = () => {
  return localStorage.getItem(ROLE_KEY) || localStorage.getItem(FALLBACK_ROLE_KEY) || 'researcher';
};

export const setUserRole = (role) => {
  if (!role) return;
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(FALLBACK_ROLE_KEY, role);
};

export const getUserProfile = () => {
  const profileStr = localStorage.getItem(USER_PROFILE_KEY);
  if (profileStr) {
    try {
      return JSON.parse(profileStr);
    } catch {
      // Ignore parse error fallback
    }
  }
  const role = getUserRole();
  return {
    fullName: 'Alex Vance',
    email: 'alex.vance@satquery.ai',
    accountType: role || 'researcher',
    institution: 'National Earth Science Institute',
    jobTitle: 'Senior Remote Sensing Specialist',
    mfaEnabled: false,
    emailVerified: true
  };
};

export const setUserProfile = (profile) => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  if (profile.accountType) {
    setUserRole(profile.accountType);
  }
};

export const getInactivityTimeout = () => {
  const val = localStorage.getItem(TIMEOUT_KEY);
  return val ? parseInt(val, 10) : 30; // Default 30 min
};

export const setInactivityTimeout = (minutes) => {
  localStorage.setItem(TIMEOUT_KEY, minutes.toString());
};

export const setPendingRegistration = (data) => {
  localStorage.setItem(PENDING_REG_KEY, JSON.stringify(data));
};

export const getPendingRegistration = () => {
  const dataStr = localStorage.getItem(PENDING_REG_KEY);
  return dataStr ? JSON.parse(dataStr) : null;
};

export const loginUser = (rolePreference = null, userProfile = null) => {
  localStorage.setItem(AUTH_KEY, 'true');
  if (rolePreference) {
    setUserRole(rolePreference);
  }
  if (userProfile) {
    setUserProfile(userProfile);
  }
};

export const logoutUser = () => {
  localStorage.setItem(AUTH_KEY, 'false');
  // Preserve profile/role for convenience on re-login
};

export const getActiveSessions = () => {
  const str = localStorage.getItem(SESSIONS_KEY);
  if (str) {
    try { return JSON.parse(str); } catch { /* ignore */ }
  }
  return INITIAL_SESSIONS;
};

export const revokeSession = (sessionId) => {
  const current = getActiveSessions().filter(s => s.id !== sessionId);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(current));
  return current;
};

export const revokeAllOtherSessions = () => {
  const current = getActiveSessions().filter(s => s.isCurrent);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(current));
  return current;
};

export const getApiKeys = () => {
  const str = localStorage.getItem(API_KEYS_KEY);
  if (str) {
    try { return JSON.parse(str); } catch { /* ignore */ }
  }
  return INITIAL_API_KEYS;
};

export const addApiKey = (name) => {
  const keys = getApiKeys();
  const randomHex = Math.random().toString(36).substring(2, 10);
  const secretKey = `sq_live_${randomHex}${Math.random().toString(36).substring(2, 18)}`;
  const newKey = {
    id: `key-${Date.now()}`,
    name,
    prefix: `${secretKey.substring(0, 11)}...`,
    created: new Date().toISOString().split('T')[0],
    lastUsed: 'Never'
  };
  const updated = [newKey, ...keys];
  localStorage.setItem(API_KEYS_KEY, JSON.stringify(updated));
  return { updated, secretKey };
};

export const deleteApiKey = (keyId) => {
  const updated = getApiKeys().filter(k => k.id !== keyId);
  localStorage.setItem(API_KEYS_KEY, JSON.stringify(updated));
  return updated;
};
