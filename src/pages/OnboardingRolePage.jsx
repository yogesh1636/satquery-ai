import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { RoleCard } from '../components/auth/RoleCard';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { rolesConfig } from '../config/rolesConfig';

export const OnboardingRolePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(
    localStorage.getItem('satquery_user_role') || localStorage.getItem('satquery_role') || ''
  );
  const [loading, setLoading] = useState(false);

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    setLoading(true);
    localStorage.setItem('satquery_role', selectedRole);
    localStorage.setItem('satquery_user_role', selectedRole);
    localStorage.setItem('satquery_is_authenticated', 'true');

    setTimeout(() => {
      setLoading(false);
      navigate(`/dashboard/${selectedRole}`);
    }, 500);
  };

  return (
    <div className="app-container">
      <HeaderNav title="Onboarding" />

      <main className="main-content">
        <div className="role-onboarding-container">
          {/* Header & Progress */}
          <div className="progress-header">
            <div className="progress-step-text">STEP 1 OF 2</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '50%' }} />
            </div>

            <h1 className="hero-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>
              How will you use SatQuery AI?
            </h1>
            <p className="subtitle">
              This helps us personalize your remote sensing workspace & AI models.
            </p>
          </div>

          {/* 2x2 Roles Grid */}
          <div className="roles-grid">
            {Object.values(rolesConfig).map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                selected={selectedRole === role.id}
                onSelect={handleSelectRole}
              />
            ))}
          </div>

          {/* Continue CTA */}
          <div style={{ maxWidth: '320px', margin: '0 auto' }}>
            <PrimaryButton
              disabled={!selectedRole}
              loading={loading}
              onClick={handleContinue}
            >
              Continue
            </PrimaryButton>
          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
};
