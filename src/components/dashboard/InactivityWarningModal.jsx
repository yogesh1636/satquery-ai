import React from 'react';
import { Clock, LogOut, CheckCircle2 } from 'lucide-react';
import { logoutUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export const InactivityWarningModal = ({ secondsRemaining, onStaySignedIn }) => {
  const navigate = useNavigate();

  const handleSignOutNow = () => {
    logoutUser();
    navigate('/login?reason=inactivity', { replace: true });
  };

  const progressPercent = Math.max(0, (secondsRemaining / 60) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 10, 25, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'linear-gradient(180deg, rgba(6, 37, 69, 0.98), rgba(0, 22, 46, 0.98))',
          border: '1px solid var(--sq-blue)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 171, 0, 0.15)',
            border: '2px solid #FFC107',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: '#FFD54F'
          }}
        >
          <Clock size={30} className="spin" style={{ animationDuration: '4s' }} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--sq-white)', marginBottom: '8px' }}>
          Session Inactivity Warning
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--sq-text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
          You have been inactive for a while. To protect your remote sensing imagery session, you will be automatically signed out in:
        </p>

        {/* Live Countdown Circle */}
        <div
          style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            margin: '0 auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(27, 91, 149, 0.4)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--sq-cyan)"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={(2 * Math.PI * 42) * (1 - progressPercent / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          </svg>
          <div style={{ position: 'absolute', fontSize: '28px', fontWeight: '800', color: 'var(--sq-white)' }}>
            {secondsRemaining}s
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '12px'
          }}
        >
          <button
            onClick={handleSignOutNow}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              background: 'rgba(0, 22, 46, 0.8)',
              border: '1px solid var(--sq-border)',
              color: 'var(--sq-text-secondary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={16} />
            Sign Out Now
          </button>

          <button
            onClick={onStaySignedIn}
            style={{
              flex: 1.2,
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--sq-blue)',
              border: 'none',
              color: 'var(--sq-white)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(9, 122, 254, 0.4)'
            }}
          >
            <CheckCircle2 size={16} />
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  );
};

export default InactivityWarningModal;
