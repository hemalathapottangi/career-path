import React from 'react';

export default function ProgressBar({ value = 0, label, showPercent = true, color = 'primary', size = 'md' }) {
  const clamped = Math.min(Math.max(Math.round(value), 0), 100);

  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
  const colors  = {
    primary: 'bg-primary-500',
    green:   'bg-green-500',
    yellow:  'bg-yellow-400',
    red:     'bg-red-500',
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercent && <span className="text-sm font-semibold text-gray-900">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heights[size]}`} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={`${heights[size]} ${colors[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
