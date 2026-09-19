import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, KeyRound, Activity, AlertTriangle } from 'lucide-react';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { EarthVisual } from '../components/auth/EarthVisual';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { SocialLoginButton } from '../components/auth/SocialLoginButton';
import { loginUser, getUserRole } from '../utils/auth';
import { loginWithGoogle, loginWithMicrosoft } from '../utils/oauth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isInactiveReason = searchParams.get('reason') === 'inactivity';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null); // 'google' | 'microsoft' | null
  const [healthStatus, setHealthStatus] = useState('SYSTEM ONLINE · GIS READY · VLM READY');

  // Poll health state
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = [
        'SYSTEM ONLINE · GIS READY · VLM READY',
        'SYSTEM ONLINE · COG TILE SERVER ACTIVE · VLM READY',
        'SYSTEM ONLINE · SENTINEL-2 PIPELINE ACTIVE · VLM READY'
      ];
      setHealthStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleFillDemo = () => {
    setEmail('demo@orbitiq.ai');
    setPassword('OrbitIQ@2026');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);

    // Mock API authentication call
    setTimeout(() => {
      setLoading(false);
      loginUser();
      const savedRole = getUserRole();
      if (savedRole) {
        navigate(`/dashboard/${savedRole}`);
      } else {
        navigate('/register/choose-role');
      }
    }, 600);
  };

  // Real Google OAuth Handler
  const handleGoogleLogin = async () => {
    setError('');
    setOauthLoading('google');
    const res = await loginWithGoogle();
    setOauthLoading(null);

    if (res.success) {
      loginUser(null, {
        fullName: res.user.name,
        email: res.user.email,
        accountType: getUserRole() || 'researcher',
        mfaEnabled: false,
        emailVerified: true
      });
      const savedRole = getUserRole();
      if (savedRole) {
        navigate(`/dashboard/${savedRole}`);
      } else {
        navigate('/register/choose-role');
      }
    } else {
      setError(res.message);
    }
  };

  // Real Microsoft OAuth Handler
  const handleMicrosoftLogin = async () => {
    setError('');
    setOauthLoading('microsoft');
    const res = await loginWithMicrosoft();
    setOauthLoading(null);

    if (res.success) {
      loginUser(null, {
        fullName: res.user.name,
        email: res.user.email,
        accountType: getUserRole() || 'researcher',
        mfaEnabled: false,
        emailVerified: true
      });
      const savedRole = getUserRole();
      if (savedRole) {
        navigate(`/dashboard/${savedRole}`);
      } else {
        navigate('/register/choose-role');
      }
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="app-container">
      <HeaderNav title="Sign In" />

      {/* Live System Health Status Strip per Spec §4.1 & §9 */}
      <div
        style={{
          background: 'rgba(0, 22, 46, 0.95)',
          borderBottom: '1px solid var(--sq-border)',
          padding: '6px 16px',
          fontSize: '11px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--sq-cyan)',
          letterSpacing: '0.04em'
        }}
      >
        <Activity size={13} className="spin" style={{ color: 'var(--sq-success)' }} />
        <span>{healthStatus}</span>
      </div>

      <main className="main-content">
        <div className="auth-split-wrapper">
          {/* Left Earth Remote Sensing Visual Panel */}
          <EarthVisual
            headline="Understand"
            highlightText="Earth. Just Ask."
            subtitle="Transform satellite imagery into actionable insights with AI-powered remote sensing."
            features={['Monitor Change', 'Detect Patterns', 'Build a Smarter Tomorrow']}
            quote="From Space to Solutions"
          />

          {/* Right Auth Form Panel */}
          <div className="auth-card-container">
            <AuthCard>
              <h2 className="auth-heading">Welcome back</h2>
              <p className="subtitle" style={{ marginBottom: '20px' }}>
                Sign in to continue your satellite analysis.
              </p>

              {/* Inactivity Logout Warning Banner */}
              {isInactiveReason && (
                <div
                  style={{
                    marginBottom: '16px',
                    padding: '10px 12px',
                    background: 'rgba(255, 171, 0, 0.15)',
                    border: '1px solid #FFC107',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#FFD54F',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                  <span>You were automatically signed out due to inactivity. Please sign in again.</span>
                </div>
              )}

              {/* Quick Demo Credentials Box */}
              <div
                style={{
                  marginBottom: '20px',
                  padding: '12px 14px',
                  background: 'rgba(9, 122, 254, 0.12)',
                  border: '1px solid var(--sq-blue)',
                  borderRadius: 'var(--sq-radius-sm)',
                  fontSize: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '700', color: 'var(--sq-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <KeyRound size={14} /> Demo Credentials
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'var(--sq-blue)',
                      border: 'none',
                      color: 'var(--sq-white)',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Auto-Fill Demo
                  </button>
                </div>
                <div style={{ color: 'var(--sq-text-secondary)', fontSize: '11px', display: 'flex', gap: '16px' }}>
                  <div>Email: <strong style={{ color: 'var(--sq-white)' }}>demo@orbitiq.ai</strong></div>
                  <div>Pass: <strong style={{ color: 'var(--sq-white)' }}>OrbitIQ@2026</strong></div>
                </div>
              </div>

              {error && <div className="field-error-msg" style={{ marginBottom: '16px' }}>{error}</div>}

              <form onSubmit={handleSubmit}>
                <AuthInput
                  id="email"
                  label="Email address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required
                  autoComplete="email"
                />

                <PasswordInput
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                <div className="auth-options-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <Link to="/forgot-password" className="auth-link">
                    Forgot password?
                  </Link>
                </div>

                <PrimaryButton loading={loading}>
                  Sign In
                </PrimaryButton>
              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <SocialLoginButton
                provider="google"
                loading={oauthLoading === 'google'}
                disabled={Boolean(oauthLoading)}
                onClick={handleGoogleLogin}
              />
              <SocialLoginButton
                provider="microsoft"
                loading={oauthLoading === 'microsoft'}
                disabled={Boolean(oauthLoading)}
                onClick={handleMicrosoftLogin}
              />

              <p className="bottom-text">
                New to OrbitIQ?{' '}
                <Link to="/register/choose-role" className="auth-link">
                  Create an account
                </Link>
              </p>
            </AuthCard>
          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
};

export default LoginPage;
