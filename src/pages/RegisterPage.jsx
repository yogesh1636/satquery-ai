import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail } from 'lucide-react';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { EarthVisual } from '../components/auth/EarthVisual';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthInput } from '../components/auth/AuthInput';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PasswordRequirements } from '../components/auth/PasswordRequirements';
import { PrimaryButton } from '../components/auth/PrimaryButton';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('Password must satisfy all security requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the Terms & Privacy Policy to continue.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/success');
    }, 600);
  };

  return (
    <div className="app-container">
      <HeaderNav title="Create Account" />

      <main className="main-content">
        <div className="auth-split-wrapper">
          {/* Left Panel */}
          <EarthVisual
            headline="A Smarter"
            highlightText="Planet Starts With You."
            subtitle="Join SatQuery AI and explore the power of satellite imagery with AI."
            features={['Access Global Data', 'AI-Powered Analysis', 'Create Real Impact']}
            quote="People. Data. A Better Tomorrow."
          />

          {/* Right Registration Card */}
          <div className="auth-card-container">
            <AuthCard>
              <h2 className="auth-heading">Create your<br />SatQuery AI account</h2>
              <p className="subtitle" style={{ marginBottom: '20px' }}>
                Start exploring satellite imagery with AI.
              </p>

              {error && <div className="field-error-msg" style={{ marginBottom: '16px' }}>{error}</div>}

              <form onSubmit={handleSubmit}>
                <AuthInput
                  id="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  icon={User}
                  required
                />

                <AuthInput
                  id="regEmail"
                  label="Email address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required
                />

                <PasswordInput
                  id="regPassword"
                  label="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <PasswordInput
                  id="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <PasswordRequirements password={password} confirmPassword={confirmPassword} />

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <span>
                      I agree to the <a href="#terms" className="auth-link">Terms & Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <PrimaryButton loading={loading}>
                  Create Account
                </PrimaryButton>
              </form>

              <p className="bottom-text">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in
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
