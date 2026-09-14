import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { EarthVisual } from '../components/auth/EarthVisual';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { PrimaryButton } from '../components/auth/PrimaryButton';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="app-container">
      <HeaderNav title="Password Recovery" />

      <main className="main-content">
        <div className="auth-split-wrapper">
          {/* Left Panel */}
          <EarthVisual
            headline="No Worries,"
            highlightText="We've Got You."
            subtitle="Reset your password and get back to exploring the Earth from a new perspective."
            features={['Secure Verification', 'Fast Recovery', 'Uninterrupted Access']}
            quote="Access Never Stops Discovery."
          />

          {/* Right Panel */}
          <div className="auth-card-container">
            <AuthCard>
              {!submitted ? (
                <>
                  <h2 className="auth-heading">Forgot your password?</h2>
                  <p className="subtitle" style={{ marginBottom: '24px' }}>
                    Enter your registered email.
                  </p>

                  {error && <div className="field-error-msg" style={{ marginBottom: '16px' }}>{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <AuthInput
                      id="forgotEmail"
                      label="Email address"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={Mail}
                      required
                    />

                    <PrimaryButton loading={loading}>
                      Send Reset Link
                    </PrimaryButton>
                  </form>

                  {/* Info card box */}
                  <div
                    style={{
                      marginTop: '24px',
                      padding: '14px',
                      background: 'rgba(0, 22, 46, 0.6)',
                      border: '1px solid var(--sq-blue-mid)',
                      borderRadius: 'var(--sq-radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '12px',
                      color: 'var(--sq-text-secondary)'
                    }}
                  >
                    <Mail size={20} style={{ color: 'var(--sq-cyan)', flexShrink: 0 }} />
                    <span>We'll send you a secure link to reset your password.</span>
                  </div>

                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <Link to="/login" className="auth-link">
                      <ArrowLeft size={16} /> Back to Sign In
                    </Link>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <CheckCircle2 size={48} style={{ color: 'var(--sq-success)', margin: '0 auto 16px auto' }} />
                  <h2 className="auth-heading">Check Your Inbox</h2>
                  <p className="subtitle" style={{ marginBottom: '20px' }}>
                    We sent a password reset link to <strong style={{ color: 'var(--sq-white)' }}>{email}</strong>
                  </p>

                  <PrimaryButton
                    onClick={() => navigate('/reset-password')}
                    style={{ marginBottom: '16px' }}
                  >
                    Simulate Reset Link Click
                  </PrimaryButton>

                  <div>
                    <Link to="/login" className="auth-link">
                      <ArrowLeft size={16} /> Back to Sign In
                    </Link>
                  </div>
                </div>
              )}
            </AuthCard>
          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
};
