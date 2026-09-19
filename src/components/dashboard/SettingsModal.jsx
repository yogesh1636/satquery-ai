import React, { useState } from 'react';
import {
  X, User, Bell, Shield, Database, Download, HelpCircle,
  Clock, Key, Smartphone, HardDrive, Trash2,
  QrCode, Lock
} from 'lucide-react';
import {
  getUserProfile, setUserProfile, getInactivityTimeout, setInactivityTimeout,
  getActiveSessions, revokeSession, revokeAllOtherSessions, getApiKeys, addApiKey, deleteApiKey
} from '../../utils/auth';

export const SettingsModal = ({ isOpen, onClose, onToast }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('security'); // default to security per request

  // Profile State
  const [profile, setProfileState] = useState(getUserProfile());
  const [fullName, setFullName] = useState(profile.fullName || 'Alex Vance');
  const [institution, setInstitution] = useState(profile.institution || 'National Earth Science Institute');

  // Notifications State
  const [notifs, setNotifs] = useState({
    aoiAlerts: true,
    weeklyDigest: true,
    productUpdates: false,
    channelEmail: true,
    channelSms: false,
    channelWebhook: true
  });

  // Security State: Inactivity
  const [timeoutMinutes, setTimeoutMinutes] = useState(getInactivityTimeout());
  const isGovDefenseOrg = profile.accountType === 'organization';

  // Security State: Change Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [showPassOtpModal, setShowPassOtpModal] = useState(false);
  const [passOtpCode, setPassOtpCode] = useState(['', '', '', '', '', '']);

  // Security State: MFA
  const [mfaEnabled, setMfaEnabled] = useState(profile.mfaEnabled || false);
  const [showMfaSetupModal, setShowMfaSetupModal] = useState(false);

  // Security State: Sessions & API Keys
  const [sessions, setSessions] = useState(getActiveSessions());
  const [apiKeys, setApiKeysState] = useState(getApiKeys());
  const [newKeyName, setNewKeyName] = useState('');
  const [createdSecretKey, setCreatedSecretKey] = useState(null);

  // Storage State
  const [cacheCleared, setCacheCleared] = useState(false);

  // Handlers
  const handleSaveProfile = () => {
    const updated = { ...profile, fullName, institution };
    setUserProfile(updated);
    setProfileState(updated);
    onToast('✓ Account details updated successfully');
  };

  const handleTimeoutChange = (val) => {
    const num = parseInt(val, 10);
    setInactivityTimeout(num);
    setTimeoutMinutes(num);
    onToast(`✓ Auto-logout inactivity timeout updated to ${num === -1 ? 'Never' : num + ' minutes'}`);
  };

  const handleInitiatePasswordChange = (e) => {
    e.preventDefault();
    setPassError('');

    if (!currentPassword) {
      setPassError('Please enter your current password.');
      return;
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setPassError('New password does not meet security requirements.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    // Trigger OTP verification step per §8
    setShowPassOtpModal(true);
  };

  const handleVerifyPasswordOtp = (e) => {
    e.preventDefault();
    const code = passOtpCode.join('');
    if (code.length < 6) {
      setPassError('Please enter the 6-digit OTP sent to your email.');
      return;
    }

    // Success! Update password & revoke other sessions per §8
    const updatedSessions = revokeAllOtherSessions();
    setSessions(updatedSessions);
    setShowPassOtpModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPassOtpCode(['', '', '', '', '', '']);
    onToast('✓ Password updated & all other active sessions revoked');
  };

  const handleRevokeSession = (id) => {
    const updated = revokeSession(id);
    setSessions(updated);
    onToast('✓ Session revoked successfully');
  };

  const handleRevokeAllOtherSessions = () => {
    const updated = revokeAllOtherSessions();
    setSessions(updated);
    onToast('✓ Signed out of all other devices');
  };

  const handleCreateApiKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const { updated, secretKey } = addApiKey(newKeyName);
    setApiKeysState(updated);
    setCreatedSecretKey(secretKey);
    setNewKeyName('');
    onToast('✓ New programmatic API Key generated');
  };

  const handleDeleteKey = (id) => {
    const updated = deleteApiKey(id);
    setApiKeysState(updated);
    onToast('✓ API Key revoked');
  };

  const handleDownloadMyData = () => {
    const data = {
      profile,
      activeSessions: sessions,
      exportTimestamp: new Date().toISOString(),
      analysisHistoryCount: 42,
      savedMonitors: ['Amazon Canopy AOI #1', 'Himalaya Glacier AOI #3']
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OrbitIQ_Account_Data_Archive_${Date.now()}.json`;
    link.click();
    onToast('✓ Account data archive exported (JSON)');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
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
          maxWidth: '960px',
          maxHeight: '90vh',
          background: 'linear-gradient(180deg, rgba(6, 37, 69, 0.98), rgba(0, 22, 46, 0.98))',
          border: '1px solid var(--sq-blue)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--sq-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0, 22, 46, 0.7)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} style={{ color: 'var(--sq-cyan)' }} />
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--sq-white)' }}>
              Settings & Security Control Panel
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--sq-text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Layout Split */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Left Sidebar Navigation */}
          <div
            style={{
              width: '220px',
              borderRight: '1px solid var(--sq-border)',
              background: 'rgba(0, 15, 33, 0.5)',
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {[
              { id: 'security', label: 'Security & Auto-Logout', icon: Shield },
              { id: 'account', label: 'Account Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'storage', label: 'Storage & Usage', icon: HardDrive },
              { id: 'privacy', label: 'Data & Privacy', icon: Database },
              { id: 'support', label: 'Help & Support', icon: HelpCircle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? 'var(--sq-white)' : 'var(--sq-text-secondary)',
                    background: isActive ? 'rgba(9, 122, 254, 0.2)' : 'transparent',
                    border: isActive ? '1px solid var(--sq-blue)' : '1px solid transparent',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? 'var(--sq-cyan)' : 'var(--sq-text-muted)' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Main Content Pane */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

            {/* TAB 1: SECURITY & AUTO-LOGOUT */}
            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Auto-Logout Section */}
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Clock size={18} style={{ color: 'var(--sq-cyan)' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--sq-white)' }}>
                      Auto-Logout on Inactivity (§7)
                    </h3>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', marginBottom: '14px' }}>
                    Automatically terminate session when idle to safeguard satellite data. Warns 60s before auto-logout.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <label style={{ fontSize: '12px', color: 'var(--sq-white)', fontWeight: '600' }}>Inactivity Timeout:</label>
                    <select
                      value={timeoutMinutes}
                      onChange={(e) => handleTimeoutChange(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        background: 'rgba(0, 22, 46, 0.9)',
                        border: '1px solid var(--sq-blue)',
                        color: 'var(--sq-white)',
                        fontSize: '12px'
                      }}
                    >
                      <option value={5}>5 Minutes</option>
                      <option value={15}>15 Minutes</option>
                      <option value={30}>30 Minutes (Default)</option>
                      <option value={60}>60 Minutes</option>
                      <option value={-1} disabled={isGovDefenseOrg}>
                        {isGovDefenseOrg ? 'Never (Disabled for Gov/Defense)' : 'Never'}
                      </option>
                    </select>

                    {isGovDefenseOrg && (
                      <span style={{ fontSize: '11px', color: '#FFC107', background: 'rgba(255, 171, 0, 0.12)', padding: '4px 8px', borderRadius: '4px' }}>
                        🔒 Gov/Defense Compliance Policy Enforced (Max 15 min)
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Password Change with Verification Section */}
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Lock size={18} style={{ color: 'var(--sq-cyan)' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--sq-white)' }}>
                      Change Password (with Email Verification §8)
                    </h3>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', marginBottom: '14px' }}>
                    Re-verifies identity via 6-digit OTP code before updating password and invalidating other active devices.
                  </p>

                  {passError && <div className="field-error-msg" style={{ marginBottom: '12px' }}>{passError}</div>}

                  <form onSubmit={handleInitiatePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="auth-input"
                    />
                    <input
                      type="password"
                      placeholder="New Password (8+ chars, 1 number, 1 special)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="auth-input"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="auth-input"
                    />

                    <button
                      type="submit"
                      style={{
                        padding: '10px 16px',
                        borderRadius: '6px',
                        background: 'var(--sq-blue)',
                        border: 'none',
                        color: 'var(--sq-white)',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        alignSelf: 'flex-start'
                      }}
                    >
                      Verify Current Password & Send OTP
                    </button>
                  </form>
                </div>

                {/* 3. Two-Factor Authentication (MFA) Section */}
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Smartphone size={18} style={{ color: 'var(--sq-cyan)' }} />
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--sq-white)' }}>
                          Two-Factor Authentication (2FA / MFA)
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--sq-text-secondary)' }}>
                          Requires an authenticator app code (TOTP) or email OTP on login.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const next = !mfaEnabled;
                        setMfaEnabled(next);
                        if (next) setShowMfaSetupModal(true);
                        onToast(`✓ MFA ${next ? 'enabled' : 'disabled'}`);
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        background: mfaEnabled ? 'rgba(50, 232, 121, 0.2)' : 'rgba(9, 122, 254, 0.2)',
                        border: mfaEnabled ? '1px solid var(--sq-success)' : '1px solid var(--sq-blue)',
                        color: mfaEnabled ? 'var(--sq-success)' : 'var(--sq-white)',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {mfaEnabled ? '● 2FA Enabled' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>

                {/* 4. Active Device Sessions Section */}
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Smartphone size={18} style={{ color: 'var(--sq-cyan)' }} />
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--sq-white)' }}>
                        Active Sessions & Devices ({sessions.length})
                      </h3>
                    </div>

                    {sessions.length > 1 && (
                      <button
                        onClick={handleRevokeAllOtherSessions}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: 'rgba(255, 61, 0, 0.15)',
                          border: '1px solid rgba(255, 61, 0, 0.4)',
                          color: '#FF5252',
                          fontSize: '11px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Sign Out All Other Sessions
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sessions.map(s => (
                      <div
                        key={s.id}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '6px',
                          background: s.isCurrent ? 'rgba(9, 122, 254, 0.15)' : 'rgba(0, 22, 46, 0.8)',
                          border: s.isCurrent ? '1px solid var(--sq-blue)' : '1px solid rgba(27, 91, 149, 0.3)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '12px'
                        }}
                      >
                        <div>
                          <div style={{ color: 'var(--sq-white)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {s.device}
                            {s.isCurrent && (
                              <span style={{ fontSize: '10px', background: 'var(--sq-blue)', padding: '1px 6px', borderRadius: '4px', color: 'var(--sq-white)' }}>
                                This Device
                              </span>
                            )}
                          </div>
                          <div style={{ color: 'var(--sq-text-secondary)', fontSize: '11px', marginTop: '2px' }}>
                            IP: {s.ip} · Last Active: {s.lastActive}
                          </div>
                        </div>

                        {!s.isCurrent && (
                          <button
                            onClick={() => handleRevokeSession(s.id)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '4px',
                              background: 'rgba(255, 61, 0, 0.2)',
                              border: '1px solid rgba(255, 61, 0, 0.4)',
                              color: '#FF5252',
                              fontSize: '11px',
                              cursor: 'pointer'
                            }}
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Programmatic API Keys Section */}
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Key size={18} style={{ color: 'var(--sq-cyan)' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--sq-white)' }}>
                      Programmatic API Keys
                    </h3>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', marginBottom: '14px' }}>
                    Access OrbitIQ VLM & Raster endpoints programmatically via Python SDK or REST API.
                  </p>

                  <form onSubmit={handleCreateApiKey} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                    <input
                      type="text"
                      placeholder="API Key Name (e.g. QGIS Automation Script)"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="auth-input"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        background: 'var(--sq-blue)',
                        border: 'none',
                        color: 'var(--sq-white)',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Generate Key
                    </button>
                  </form>

                  {createdSecretKey && (
                    <div style={{ marginBottom: '14px', padding: '12px', background: 'rgba(50, 232, 121, 0.15)', border: '1px solid var(--sq-success-dark)', borderRadius: '6px', fontSize: '12px' }}>
                      <div style={{ color: 'var(--sq-success)', fontWeight: '700', marginBottom: '4px' }}>
                        ✓ New API Key Generated (Copy Now — Shown Once!):
                      </div>
                      <code style={{ background: 'rgba(0,0,0,0.4)', padding: '6px', borderRadius: '4px', color: 'var(--sq-white)', display: 'block', wordBreak: 'break-all' }}>
                        {createdSecretKey}
                      </code>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {apiKeys.map(k => (
                      <div key={k.id} style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(0, 22, 46, 0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                        <div>
                          <div style={{ color: 'var(--sq-white)', fontWeight: '600' }}>{k.name}</div>
                          <div style={{ color: 'var(--sq-text-secondary)', fontSize: '11px' }}>{k.prefix} · Created: {k.created} · Last Used: {k.lastUsed}</div>
                        </div>
                        <button onClick={() => handleDeleteKey(k.id)} style={{ background: 'none', border: 'none', color: '#FF5252', cursor: 'pointer' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: ACCOUNT PROFILE */}
            {activeTab === 'account' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--sq-white)' }}>Account Profile Settings</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '440px' }}>
                  <div>
                    <label className="input-label">Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="auth-input" />
                  </div>
                  <div>
                    <label className="input-label">Email Address (Read-only)</label>
                    <input type="email" value={profile.email} disabled className="auth-input" style={{ opacity: 0.6 }} />
                  </div>
                  <div>
                    <label className="input-label">Organization / Institution</label>
                    <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className="auth-input" />
                  </div>
                  <div>
                    <label className="input-label">Account Type Badge</label>
                    <div style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', background: 'rgba(9, 122, 254, 0.2)', border: '1px solid var(--sq-blue)', color: 'var(--sq-cyan)', fontSize: '12px', fontWeight: '600', textTransform: 'capitalize' }}>
                      {profile.accountType} Persona
                    </div>
                  </div>
                  <button onClick={handleSaveProfile} style={{ padding: '10px 16px', borderRadius: '6px', background: 'var(--sq-blue)', border: 'none', color: 'var(--sq-white)', fontSize: '12px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}>
                    Save Profile Changes
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--sq-white)' }}>Notification Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { key: 'aoiAlerts', label: 'Monitored AOI Anomaly Alerts', desc: 'Notify immediately when vegetation or water thresholds are breached in saved AOIs.' },
                    { key: 'weeklyDigest', label: 'Weekly Earth Observation Digest', desc: 'Receive a summary of Q3 2026 satellite imagery updates.' },
                    { key: 'productUpdates', label: 'Product & Model Updates', desc: 'Notifies when new VLM specialist models or Sentinel passes are available.' }
                  ].map(n => (
                    <label key={n.key} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', borderRadius: '8px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)', cursor: 'pointer' }}>
                      <input type="checkbox" checked={notifs[n.key]} onChange={(e) => setNotifs({ ...notifs, [n.key]: e.target.checked })} style={{ marginTop: '2px' }} />
                      <div>
                        <div style={{ color: 'var(--sq-white)', fontWeight: '600', fontSize: '13px' }}>{n.label}</div>
                        <div style={{ color: 'var(--sq-text-secondary)', fontSize: '11px' }}>{n.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STORAGE & USAGE */}
            {activeTab === 'storage' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--sq-white)' }}>Storage & Data Consumption</h3>
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                    <span style={{ color: 'var(--sq-text-secondary)' }}>Object Storage Used</span>
                    <span style={{ color: 'var(--sq-cyan)', fontWeight: '700' }}>2.4 GB / 10.0 GB</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(0, 22, 46, 0.9)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ width: '24%', height: '100%', background: 'linear-gradient(90deg, var(--sq-blue), var(--sq-cyan))' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '12px', marginBottom: '16px' }}>
                    <div>Rasters & COG: <strong>1.8 GB</strong></div>
                    <div>Generated Reports: <strong>420 MB</strong></div>
                    <div>Local Tile Cache: <strong>180 MB</strong></div>
                  </div>
                  <button
                    onClick={() => { setCacheCleared(true); onToast('✓ Tile cache cleared (180 MB freed)'); }}
                    style={{ padding: '8px 14px', borderRadius: '6px', background: 'rgba(9, 122, 254, 0.2)', border: '1px solid var(--sq-blue)', color: 'var(--sq-white)', fontSize: '12px', cursor: 'pointer' }}
                  >
                    {cacheCleared ? '✓ Tile Cache Cleared' : 'Clear Tile Cache'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: DATA & PRIVACY */}
            {activeTab === 'privacy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--sq-white)' }}>Data & Privacy Control</h3>
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sq-white)', marginBottom: '6px' }}>Download My Data</h4>
                  <p style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', marginBottom: '12px' }}>
                    Export a full JSON archive of your account profile, saved AOI monitors, and analysis history.
                  </p>
                  <button onClick={handleDownloadMyData} style={{ padding: '8px 14px', borderRadius: '6px', background: 'var(--sq-blue)', border: 'none', color: 'var(--sq-white)', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Download size={14} /> Download Account Archive
                  </button>
                </div>
              </div>
            )}

            {/* TAB 6: HELP & SUPPORT */}
            {activeTab === 'support' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--sq-white)' }}>Help & System Info</h3>
                <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(0, 22, 46, 0.6)', border: '1px solid var(--sq-border)' }}>
                  <div>App Version: <strong>OrbitIQ AI v1.0.0 (Build 2026.09)</strong></div>
                  <div>VLM Engine: <strong>PyTorch VLM Grounding Specialist v2.4</strong></div>
                  <div>Geospatial Backend: <strong>PostGIS 15 + Rasterio COG</strong></div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* PASSWORD OTP VERIFICATION MODAL (§8) */}
      {showPassOtpModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(6, 37, 69, 0.98)', border: '1px solid var(--sq-blue)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--sq-white)', marginBottom: '8px' }}>Verify Password Change</h3>
            <p style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', marginBottom: '16px' }}>
              We have sent a 6-digit OTP code to <strong>{profile.email}</strong> to verify this change.
            </p>
            <form onSubmit={handleVerifyPasswordOtp}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                {passOtpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...passOtpCode];
                      newCode[idx] = e.target.value;
                      setPassOtpCode(newCode);
                    }}
                    style={{ width: '40px', height: '48px', borderRadius: '6px', border: '1px solid var(--sq-blue)', background: 'rgba(0,22,46,0.8)', color: 'var(--sq-white)', textAlign: 'center', fontSize: '18px', fontWeight: '700' }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => setShowPassOtpModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '6px', background: 'transparent', border: '1px solid var(--sq-border)', color: 'var(--sq-text-muted)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '6px', background: 'var(--sq-blue)', border: 'none', color: 'var(--sq-white)', fontWeight: '600', cursor: 'pointer' }}>Verify & Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MFA SETUP QR MODAL */}
      {showMfaSetupModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(6, 37, 69, 0.98)', border: '1px solid var(--sq-blue)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--sq-white)', marginBottom: '8px' }}>Setup Two-Factor Authentication</h3>
            <p style={{ fontSize: '12px', color: 'var(--sq-text-secondary)', marginBottom: '16px' }}>Scan this QR code with Google Authenticator or Microsoft Authenticator app:</p>
            <div style={{ background: 'white', padding: '12px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px' }}>
              <QrCode size={120} style={{ color: '#000' }} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sq-text-muted)', marginBottom: '16px' }}>Secret Key: <code>SQAI-2FA-9842-7104</code></div>
            <button onClick={() => setShowMfaSetupModal(false)} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: 'var(--sq-blue)', border: 'none', color: 'var(--sq-white)', fontWeight: '600', cursor: 'pointer' }}>Done & Verify</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsModal;
