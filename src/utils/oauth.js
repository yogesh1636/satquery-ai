// Real Google & Microsoft OAuth 2.0 Authentication Engine for SPA (Public Client)
// Enforces zero-fake logins when credentials are missing and uses PKCE/Token Popup flows.

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID || '';

/**
 * Calculates current origin + pathname redirect URI.
 * Works dynamically on both localhost (http://localhost:5173/) and GitHub Pages (https://yogesh1636.github.io/satquery-ai/)
 */
export const getRedirectUri = () => {
  const url = window.location.origin + window.location.pathname;
  return url.endsWith('/') ? url : url + '/';
};

export const isGoogleConfigured = () => {
  return Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID.trim().length > 0);
};

export const isMicrosoftConfigured = () => {
  return Boolean(MICROSOFT_CLIENT_ID && MICROSOFT_CLIENT_ID.trim().length > 0);
};

/**
 * Helper to open an OAuth popup window centered on the screen.
 */
const openOAuthPopup = (url, title = 'OAuth Sign-In') => {
  const width = 500;
  const height = 650;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  return window.open(
    url,
    title,
    `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=yes`
  );
};

/**
 * Initiate Real Google OAuth 2.0 Login
 */
export const loginWithGoogle = async () => {
  if (!isGoogleConfigured()) {
    return {
      success: false,
      reason: 'unconfigured',
      message: 'Google authentication is not configured yet. Please set VITE_GOOGLE_CLIENT_ID in your .env file.'
    };
  }

  return new Promise((resolve) => {
    const redirectUri = getRedirectUri();
    const state = Math.random().toString(36).substring(2, 15);
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent('openid profile email')}` +
      `&state=${state}` +
      `&prompt=select_account`;

    const popup = openOAuthPopup(googleAuthUrl, 'Google Sign-In');

    if (!popup) {
      resolve({
        success: false,
        reason: 'popup_blocked',
        message: 'Google sign-in popup was blocked by browser. Please allow popups.'
      });
      return;
    }

    let checkInterval = null;

    // Handler for OAuth redirect token payload
    const handleMessage = async (event) => {
      if (event.data && event.data.type === 'SATQUERY_OAUTH_TOKEN' && event.data.provider === 'google') {
        window.removeEventListener('message', handleMessage);
        if (checkInterval) clearInterval(checkInterval);
        popup.close();

        const token = event.data.access_token;
        if (!token) {
          resolve({ success: false, reason: 'error', message: 'Google authentication failed to return token.' });
          return;
        }

        try {
          // Fetch Google Profile
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error('Failed to fetch user profile');
          const profile = await res.json();

          resolve({
            success: true,
            user: {
              uid: profile.sub,
              name: profile.name || profile.email.split('@')[0],
              email: profile.email,
              avatar: profile.picture || null,
              provider: 'google'
            }
          });
        } catch (err) {
          resolve({ success: false, reason: 'error', message: 'Unable to retrieve Google user profile: ' + err.message });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Poll if user manually closes the popup window without completing authentication
    checkInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkInterval);
        window.removeEventListener('message', handleMessage);
        resolve({
          success: false,
          reason: 'cancelled',
          message: 'Google sign-in was cancelled.'
        });
      }
    }, 1000);
  });
};

/**
 * Initiate Real Microsoft OAuth 2.0 Login
 */
export const loginWithMicrosoft = async () => {
  if (!isMicrosoftConfigured()) {
    return {
      success: false,
      reason: 'unconfigured',
      message: 'Microsoft authentication is not configured yet. Please set VITE_MICROSOFT_CLIENT_ID in your .env file.'
    };
  }

  return new Promise((resolve) => {
    const redirectUri = getRedirectUri();
    const state = Math.random().toString(36).substring(2, 15);
    const msAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
      `client_id=${encodeURIComponent(MICROSOFT_CLIENT_ID)}` +
      `&response_type=token` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent('openid profile email User.Read')}` +
      `&state=${state}` +
      `&prompt=select_account`;

    const popup = openOAuthPopup(msAuthUrl, 'Microsoft Sign-In');

    if (!popup) {
      resolve({
        success: false,
        reason: 'popup_blocked',
        message: 'Microsoft sign-in popup was blocked by browser. Please allow popups.'
      });
      return;
    }

    let checkInterval = null;

    const handleMessage = async (event) => {
      if (event.data && event.data.type === 'SATQUERY_OAUTH_TOKEN' && event.data.provider === 'microsoft') {
        window.removeEventListener('message', handleMessage);
        if (checkInterval) clearInterval(checkInterval);
        popup.close();

        const token = event.data.access_token;
        if (!token) {
          resolve({ success: false, reason: 'error', message: 'Microsoft authentication failed to return token.' });
          return;
        }

        try {
          // Fetch Microsoft Graph Profile
          const res = await fetch('https://graph.microsoft.com/v1.0/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error('Failed to fetch Microsoft Graph user profile');
          const profile = await res.json();

          resolve({
            success: true,
            user: {
              uid: profile.id,
              name: profile.displayName || profile.mail || 'Microsoft User',
              email: profile.mail || profile.userPrincipalName,
              avatar: null,
              provider: 'microsoft'
            }
          });
        } catch (err) {
          resolve({ success: false, reason: 'error', message: 'Unable to retrieve Microsoft user profile: ' + err.message });
        }
      }
    };

    window.addEventListener('message', handleMessage);

    checkInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkInterval);
        window.removeEventListener('message', handleMessage);
        resolve({
          success: false,
          reason: 'cancelled',
          message: 'Microsoft sign-in was cancelled.'
        });
      }
    }, 1000);
  });
};

/**
 * Handle OAuth Redirect Hash Fragment in main window or popup
 * Call this function on app load to capture popup token return.
 */
export const checkOAuthCallback = () => {
  if (window.location.hash && window.location.hash.includes('access_token=')) {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    const state = params.get('state');

    if (accessToken && window.opener) {
      // Determine provider or post message back to main window
      const isMs = window.location.href.includes('microsoft') || document.referrer.includes('microsoft');
      const provider = isMs ? 'microsoft' : 'google';

      window.opener.postMessage({
        type: 'SATQUERY_OAUTH_TOKEN',
        provider,
        access_token: accessToken,
        state
      }, '*');
      window.close();
      return true;
    }
  }
  return false;
};

export const logoutOAuthProvider = (provider) => {
  if (provider === 'google' && window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
};
