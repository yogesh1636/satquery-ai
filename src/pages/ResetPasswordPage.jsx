import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { EarthVisual } from '../components/auth/EarthVisual';
import { AuthCard } from '../components/auth/AuthCard';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PasswordRequirements } from '../components/auth/PasswordRequirements';
import { PrimaryButton } from '../components/auth/PrimaryButton';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('New password does not satisfy all requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 600);
  };

  return (
    <div className="app-container">
      <HeaderNav title="Reset Password" />

      <main className="main-content">
        <div className="auth-split-wrapper">
          {/* Left Panel */}
          <EarthVisual
            headline="A Fresh Start"
            highlightText="for New Insights."
            subtitle="Reset your password and continue your journey with OrbitIQ."
            features={['Enhanced Encryption', 'Instant Update', 'Account Safeguard']}
            quote="Same Mission. Stronger Together."
          />

          {/* Right Reset Password Form Card */}
          <div className="auth-card-container">
            <AuthCard>
              <h2 className="auth-heading">Create new password</h2>
              <p className="subtitle" style={{ marginBottom: '24px' }}>
                Enter your new password below.
              </p>

              {error && <div className="field-error-msg" style={{ marginBottom: '16px' }}>{error}</div>}

              <form onSubmit={handleSubmit}>
                <PasswordInput
                  id="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <PasswordInput
                  id="confirmNewPassword"
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <PasswordRequirements password={password} confirmPassword={confirmPassword} />

                <PrimaryButton loading={loading}>
                  Reset Password
                </PrimaryButton>
              </form>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Link to="/login" className="auth-link">
                  <ArrowLeft size={16} /> Back to Sign In
                </Link>
              </div>
            </AuthCard>
          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
};
