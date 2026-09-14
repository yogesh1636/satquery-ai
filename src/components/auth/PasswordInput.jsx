import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export const PasswordInput = ({
  id = 'password',
  label = 'Password',
  placeholder = 'Enter password',
  value,
  onChange,
  error,
  required = false,
  autoComplete = 'current-password'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="field-label">
          {label} {required && <span style={{ color: 'var(--sq-cyan)' }}>*</span>}
        </label>
      )}
      <div className="input-wrapper">
        <span className="input-icon"><Lock size={18} /></span>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className="input-field has-action-btn"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
        />
        <button
          type="button"
          className="input-action-btn"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <span className="field-error-msg">{error}</span>}
    </div>
  );
};
