import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const Clock: React.FC = () => {
  const currentTime = useCurrentTime();

  return (
    <div className="text-center">
      <h1 className="text-6xl md:text-8xl font-black text-slate-800 dark:text-white tracking-tighter">
        {formatTime(currentTime)}
      </h1>
      <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
        {formatDate(currentTime)}
      </p>
    </div>
  );
};
