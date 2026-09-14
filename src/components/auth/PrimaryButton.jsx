import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export const PrimaryButton = ({
  children,
  onClick,
  type = 'submit',
  disabled = false,
  loading = false,
  showArrow = true,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn-primary ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
      ) : (
        <>
          <span>{children}</span>
          {showArrow && <ArrowRight size={18} />}
        </>
      )}
    </button>
  );
};
