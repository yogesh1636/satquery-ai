import React from 'react';

export const AuthCard = ({ children, className = '' }) => {
  return (
    <div className={`auth-card ${className}`}>
      {children}
    </div>
  );
};
