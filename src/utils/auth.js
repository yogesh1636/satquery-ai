// Centralized Authentication & Role Persistence State Manager

const AUTH_KEY = 'satquery_is_authenticated';
const ROLE_KEY = 'satquery_user_role';
const FALLBACK_ROLE_KEY = 'satquery_role';

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const getUserRole = () => {
  return localStorage.getItem(ROLE_KEY) || localStorage.getItem(FALLBACK_ROLE_KEY) || null;
};

export const setUserRole = (role) => {
  if (!role) return;
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(FALLBACK_ROLE_KEY, role);
};

export const loginUser = (rolePreference = null) => {
  localStorage.setItem(AUTH_KEY, 'true');
  if (rolePreference) {
    setUserRole(rolePreference);
  }
};

export const logoutUser = () => {
  localStorage.setItem(AUTH_KEY, 'false');
  // NOTE: Role preference (ROLE_KEY) is intentionally preserved so onboarding can be skipped on re-login
};
