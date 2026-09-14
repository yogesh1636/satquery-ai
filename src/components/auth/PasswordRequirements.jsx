import React from 'react';
import { Check, X } from 'lucide-react';

export const PasswordRequirements = ({ password = '', confirmPassword = '' }) => {
  const reqs = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Include a number', met: /\d/.test(password) },
    { label: 'Include a special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: 'Passwords match', met: password !== '' && password === confirmPassword }
  ];

  return (
    <div className="password-requirements-panel">
      <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--sq-text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Password Requirements
      </div>
      {reqs.map((req, idx) => (
        <div key={idx} className={`req-item ${req.met ? 'satisfied' : ''}`}>
          {req.met ? <Check size={14} /> : <X size={14} style={{ opacity: 0.4 }} />}
          <span>{req.label}</span>
        </div>
      ))}
    </div>
  );
};
