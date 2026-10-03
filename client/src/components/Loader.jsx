import React from 'react';
import { Compass } from 'lucide-react';

export default function Loader({ fullScreen = false, message = 'Loading…', size = 'md' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-7 h-7', lg: 'w-10 h-10' };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <Compass className={`${sizes[size]} text-primary-600 animate-spin`} />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex justify-center py-12">{spinner}</div>;
}

// Inline button spinner
export function ButtonSpinner() {
  return <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />;
}
