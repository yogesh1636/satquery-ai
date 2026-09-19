import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, X } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Monitored AOI Alert: Amazon Basin',
    message: 'NDVI Vegetation Anomaly (+14.2%) breached threshold in Q3 satellite pass.',
    time: '5 mins ago',
    type: 'alert',
    unread: true
  },
  {
    id: 'n2',
    title: 'Sentinel-2 L2A Pass Complete',
    message: '13-Band Multispectral rasters co-registered & indexed for Himalaya Region.',
    time: '1 hour ago',
    type: 'info',
    unread: true
  },
  {
    id: 'n3',
    title: 'Deforestation Change Detection Result',
    message: '1,248 km² forest cover reduction detected with 94.2% confidence.',
    time: '3 hours ago',
    type: 'warning',
    unread: true
  }
];

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleDismiss = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        style={{
          position: 'relative',
          padding: '8px',
          borderRadius: '8px',
          background: isOpen ? 'rgba(9, 122, 254, 0.25)' : 'rgba(0, 22, 46, 0.8)',
          border: '1px solid var(--sq-border)',
          color: 'var(--sq-white)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Bell size={18} style={{ color: unreadCount > 0 ? 'var(--sq-cyan)' : 'var(--sq-text-secondary)' }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#FF3D00',
              color: '#FFF',
              fontSize: '10px',
              fontWeight: '800',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(0, 22, 46, 0.9)'
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '46px',
            right: 0,
            width: '340px',
            background: 'linear-gradient(180deg, rgba(6, 37, 69, 0.98), rgba(0, 22, 46, 0.98))',
            border: '1px solid var(--sq-blue)',
            borderRadius: '12px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
            zIndex: 8000,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--sq-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0, 22, 46, 0.7)'
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--sq-white)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={14} style={{ color: 'var(--sq-cyan)' }} />
              Monitored Alerts & Feeds
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{ background: 'none', border: 'none', color: 'var(--sq-cyan)', fontSize: '11px', cursor: 'pointer' }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--sq-text-muted)', fontSize: '12px' }}>
                No active notifications.
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(27, 91, 149, 0.2)',
                    background: n.unread ? 'rgba(9, 122, 254, 0.12)' : 'transparent',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{ marginTop: '2px', flexShrink: 0 }}>
                    {n.type === 'alert' && <AlertTriangle size={16} style={{ color: '#FFD54F' }} />}
                    {n.type === 'warning' && <ShieldAlert size={16} style={{ color: '#FF5252' }} />}
                    {n.type === 'info' && <CheckCircle2 size={16} style={{ color: 'var(--sq-success)' }} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--sq-white)', marginBottom: '2px' }}>
                      {n.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--sq-text-secondary)', lineHeight: '1.4' }}>
                      {n.message}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--sq-text-muted)', marginTop: '4px' }}>
                      {n.time}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDismiss(n.id, e)}
                    style={{ background: 'none', border: 'none', color: 'var(--sq-text-muted)', cursor: 'pointer', padding: '2px' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
