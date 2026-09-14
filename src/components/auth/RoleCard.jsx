import React from 'react';
import { FlaskConical, GraduationCap, Map, Building2, Check } from 'lucide-react';

const iconMap = {
  FlaskConical,
  GraduationCap,
  Map,
  Building2
};

export const RoleCard = ({ role, selected, onSelect }) => {
  const IconComponent = iconMap[role.iconName] || Map;

  return (
    <div
      className={`role-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(role.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(role.id);
        }
      }}
    >
      <div className="role-check-indicator">
        <Check size={14} />
      </div>
      <div className="role-icon-wrapper">
        <IconComponent size={24} />
      </div>
      <h3 className="role-title">{role.label}</h3>
      <p className="role-desc">{role.description}</p>
    </div>
  );
};
