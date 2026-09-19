import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HeaderNav } from '../components/layout/HeaderNav';
import { FooterStrip } from '../components/layout/FooterStrip';
import { RoleCard } from '../components/auth/RoleCard';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { rolesConfig } from '../config/rolesConfig';

export const ChooseRolePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleContinue = () => {
    if (!selectedRole) return;
    navigate(`/register/${selectedRole}`);
  };

  return (
    <div className="app-container">
      <HeaderNav title="Choose Your Path" />

      <main className="main-content">
        <div className="role-onboarding-container">
          <div className="progress-header">
            <div className="progress-step-text">STEP 1 OF 3 · ROLE SELECTION</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '33%' }} />
            </div>

            <h1 className="hero-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>
              Choose Your OrbitIQ Path
            </h1>
            <p className="subtitle">
              Select your primary role to customize registration fields, AI specialist tools, and data presets.
            </p>
          </div>

          <div className="roles-grid">
            {Object.values(rolesConfig).map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                selected={selectedRole === role.id}
                onSelect={(id) => setSelectedRole(id)}
              />
            ))}
          </div>

          <div style={{ maxWidth: '340px', margin: '0 auto', textAlign: 'center' }}>
            <PrimaryButton
              disabled={!selectedRole}
              onClick={handleContinue}
            >
              Continue to Registration
            </PrimaryButton>

            <p className="bottom-text" style={{ marginTop: '16px' }}>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
};

export default ChooseRolePage;
