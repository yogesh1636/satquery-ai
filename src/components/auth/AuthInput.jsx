import React from 'react';

export const AuthInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  autoComplete
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="field-label">
          {label} {required && <span style={{ color: 'var(--sq-cyan)' }}>*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && <span className="input-icon"><Icon size={18} /></span>}
        <input
          id={id}
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          style={{ paddingLeft: Icon ? '42px' : '14px' }}
        />
      </div>
      {error && <span className="field-error-msg">{error}</span>}
    </div>
  );
};
