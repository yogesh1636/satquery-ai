import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInactivityTimeout, logoutUser, getUserProfile } from '../utils/auth';

export const useIdleTimer = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();

  // Organization Gov/Defense check: max allowed timeout is 15 minutes
  const isGovDefenseOrg = profile?.accountType === 'organization';
  const configuredTimeoutMinutes = getInactivityTimeout();
  const effectiveTimeoutMinutes = isGovDefenseOrg && configuredTimeoutMinutes > 15
    ? 15
    : (configuredTimeoutMinutes === -1 ? 999999 : configuredTimeoutMinutes);

  const timeoutMs = effectiveTimeoutMinutes * 60 * 1000;
  const warningWindowMs = 60 * 1000; // Show warning 60 seconds before logout

  const [showWarning, setShowWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const lastActivityRef = useRef(Date.now());
  const countdownIntervalRef = useRef(null);

  // Reset timer handler (e.g. on user activity or "Stay signed in" click)
  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (showWarning) {
      setShowWarning(false);
      setSecondsRemaining(60);
    }
  }, [showWarning]);

  // Main inactivity tick interval
  useEffect(() => {
    if (effectiveTimeoutMinutes > 100000) return; // "Never" option for non-gov

    const checkInactivity = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastActivityRef.current;
      const remainingMs = timeoutMs - elapsed;

      if (remainingMs <= 0) {
        // Expired! Force logout
        clearInterval(checkInactivity);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        logoutUser();
        navigate('/login?reason=inactivity', { replace: true });
      } else if (remainingMs <= warningWindowMs) {
        // Within warning window
        if (!showWarning) {
          setShowWarning(true);
        }
        setSecondsRemaining(Math.max(0, Math.ceil(remainingMs / 1000)));
      } else {
        if (showWarning) {
          setShowWarning(false);
        }
      }
    }, 1000);

    return () => clearInterval(checkInactivity);
  }, [effectiveTimeoutMinutes, timeoutMs, showWarning, navigate]);

  // User event listeners with 5-second throttle
  useEffect(() => {
    if (effectiveTimeoutMinutes > 100000) return;

    let lastThrottleTime = 0;
    const handleUserActivity = () => {
      const now = Date.now();
      if (now - lastThrottleTime > 5000) {
        lastThrottleTime = now;
        // Only reset if warning modal is not currently displayed
        if (!showWarning) {
          lastActivityRef.current = now;
        }
      }
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, handleUserActivity));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleUserActivity));
    };
  }, [effectiveTimeoutMinutes, showWarning]);

  return {
    showWarning,
    secondsRemaining,
    resetTimer,
    effectiveTimeoutMinutes
  };
};

export default useIdleTimer;
