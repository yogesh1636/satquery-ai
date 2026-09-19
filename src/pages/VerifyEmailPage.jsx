import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, RefreshCw, ArrowLeft } from 'lucide-react';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { AuthCard } from '../components/auth/AuthCard';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { getPendingRegistration, loginUser } from '../utils/auth';

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const pending = getPendingRegistration() || {
    fullName: 'New User',
    email: 'user@satquery.ai',
    accountType: 'researcher'
  };

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState(60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resentNotice, setResentNotice] = useState(false);

  // 60-second OTP resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChangeOtp = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendCode = () => {
    if (cooldown > 0) return;
    setCooldown(60);
    setResentNotice(true);
    setTimeout(() => setResentNotice(false), 4000);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Confirm verification & log user in
      loginUser(pending.accountType || 'researcher', {
        fullName: pending.fullName,
        email: pending.email,
        accountType: pending.accountType || 'researcher',
        institution: pending.orgName || 'Workspace',
        mfaEnabled: pending.accountType === 'organization',
        emailVerified: true
      });
      navigate('/success');
    }, 700);
  };

  return (
    <div className="app-container">
      <HeaderNav title="Email Verification" />

      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '24px 16px' }}>
          <AuthCard>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(9, 122, 254, 0.15)',
                  border: '1px solid var(--sq-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: 'var(--sq-cyan)'
                }}
              >
                <ShieldCheck size={28} />
              </div>

              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: 'rgba(50, 232, 121, 0.15)',
                  color: 'var(--sq-success)',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
              >
                STEP 3 OF 3 · VERIFICATION
              </span>

              <h2 className="auth-heading" style={{ fontSize: '22px', marginTop: '8px' }}>
                Verify your Email
              </h2>
              <p className="subtitle" style={{ fontSize: '13px' }}>
                We have sent a 6-digit verification code to<br />
                <strong style={{ color: 'var(--sq-white)' }}>{pending.email}</strong>
              </p>
            </div>

            {error && <div className="field-error-msg" style={{ marginBottom: '16px' }}>{error}</div>}
            {resentNotice && (
              <div
                style={{
                  marginBottom: '16px',
                  padding: '10px',
                  borderRadius: '6px',
                  background: 'rgba(50, 232, 121, 0.12)',
                  border: '1px solid var(--sq-success-dark)',
                  fontSize: '12px',
                  color: 'var(--sq-success)',
                  textAlign: 'center'
                }}
              >
                ✓ A new 6-digit verification code was dispatched!
              </div>
            )}

            {/* Quick Demo Autofill Box */}
            <div
              style={{
                marginBottom: '20px',
                padding: '10px 12px',
                background: 'rgba(9, 122, 254, 0.12)',
                border: '1px dashed var(--sq-blue)',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px'
              }}
            >
              <span style={{ color: 'var(--sq-text-secondary)' }}>Demo Verification Code: <strong style={{ color: 'var(--sq-cyan)' }}>849201</strong></span>
              <button
                type="button"
                onClick={() => setOtp(['8', '4', '9', '2', '0', '1'])}
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'var(--sq-blue)',
                  border: 'none',
                  color: 'var(--sq-white)',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Auto-Fill
              </button>
            </div>

            <form onSubmit={handleVerify}>
              {/* 6 OTP Input Boxes */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChangeOtp(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    style={{
                      width: '44px',
                      height: '52px',
                      borderRadius: '8px',
                      border: digit ? '1px solid var(--sq-cyan)' : '1px solid var(--sq-border)',
                      background: digit ? 'rgba(9, 122, 254, 0.2)' : 'rgba(0, 22, 46, 0.8)',
                      color: 'var(--sq-white)',
                      fontSize: '20px',
                      fontWeight: '700',
                      textAlign: 'center',
                      outline: 'none',
                      transition: 'all 150ms ease'
                    }}
                  />
                ))}
              </div>

              <PrimaryButton loading={loading}>
                Verify & Create Account
              </PrimaryButton>
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '12px' }}>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={cooldown > 0}
                style={{
                  background: 'none',
                  border: 'none',
                  color: cooldown > 0 ? 'var(--sq-text-muted)' : 'var(--sq-cyan)',
                  cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={12} className={cooldown > 0 ? '' : 'spin'} />
                {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code Now'}
              </button>

              <Link to="/register/choose-role" style={{ color: 'var(--sq-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeft size={12} /> Change Email
              </Link>
            </div>
          </AuthCard>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
};

export default VerifyEmailPage;
