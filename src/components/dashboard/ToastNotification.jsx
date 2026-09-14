import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

export const ToastNotification = ({ message, type = 'success', onClose: _onClose }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'rgba(0, 22, 46, 0.95)',
        border: type === 'success' ? '1px solid var(--sq-success)' : '1px solid var(--sq-cyan)',
        borderRadius: '8px',
        padding: '12px 18px',
        color: 'var(--sq-white)',
        fontSize: '13px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(12px)',
        animation: 'slideInRight 300ms ease'
      }}
    >
      {type === 'success' ? (
        <CheckCircle2 size={18} style={{ color: 'var(--sq-success)' }} />
      ) : (
        <Info size={18} style={{ color: 'var(--sq-cyan)' }} />
      )}
      <span>{message}</span>
    </div>
  );
};
