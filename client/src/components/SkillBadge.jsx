import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const STATUS_CONFIG = {
  'Completed':   { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, cls: 'bg-green-50 border-green-200 text-green-800' },
  'In Progress': { icon: <Clock        className="w-4 h-4 text-yellow-500" />, cls: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
  'Not Started': { icon: <Circle       className="w-4 h-4 text-gray-400" />,  cls: 'bg-gray-50  border-gray-200  text-gray-700'  },
};

/**
 * SkillBadge — shows a skill name with an optional status icon
 * Used in FR4 skill-gap analysis and FR6 dashboard
 */
export default function SkillBadge({ label, status, size = 'md' }) {
  const config = status ? STATUS_CONFIG[status] || STATUS_CONFIG['Not Started'] : null;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${padding} ${
        config ? config.cls : 'bg-primary-50 border-primary-200 text-primary-800'
      }`}
    >
      {config && config.icon}
      {label}
    </span>
  );
}

/**
 * SkillStatusRow — full-width row for skill with status selector
 * Used in FR6 dashboard progress tracker
 */
export function SkillStatusRow({ skillId, label, status = 'Not Started', onChange }) {
  const statuses = ['Not Started', 'In Progress', 'Completed'];

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {STATUS_CONFIG[status]?.icon}
        <span className="text-sm font-medium text-gray-800 truncate">{label}</span>
      </div>
      <select
        value={status}
        onChange={(e) => onChange && onChange(skillId, e.target.value)}
        aria-label={`Status for ${label}`}
        className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      >
        {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
}
