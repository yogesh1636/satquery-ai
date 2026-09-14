import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, KeyRound } from 'lucide-react';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { EarthVisual } from '../components/auth/EarthVisual';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { SocialLoginButton } from '../components/auth/SocialLoginButton';
import { loginUser, getUserRole } from '../utils/auth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFillDemo = () => {
    setEmail('demo@satquery.ai');
    setPassword('SatQuery@2026');
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
        navigate('/onboarding/role');
      }
    }, 600);
  };

  return (
    <div className="app-container">
      <HeaderNav title="Sign In" />

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
                  <div>Email: <strong style={{ color: 'var(--sq-white)' }}>demo@satquery.ai</strong></div>
                  <div>Pass: <strong style={{ color: 'var(--sq-white)' }}>SatQuery@2026</strong></div>
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
                onClick={() => {
                  loginUser();
                  const savedRole = getUserRole();
                  if (savedRole) {
                    navigate(`/dashboard/${savedRole}`);
                  } else {
                    navigate('/onboarding/role');
                  }
                }}
              />
              <SocialLoginButton
                provider="microsoft"
                onClick={() => {
                  loginUser();
                  const savedRole = getUserRole();
                  if (savedRole) {
                    navigate(`/dashboard/${savedRole}`);
                  } else {
                    navigate('/onboarding/role');
                  }
                }}
              />

              <p className="bottom-text">
                New to SatQuery AI?{' '}
                <Link to="/register" className="auth-link">
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
