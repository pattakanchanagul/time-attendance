import React from 'react';
import { AttendanceStatus } from '../types';

interface ActionButtonProps {
  status: AttendanceStatus;
  onClick: () => void;
  isLoading: boolean;
}

const buttonConfig = {
  [AttendanceStatus.ClockedIn]: {
    label: 'Clock Out',
    className: 'bg-red-500 hover:bg-red-600 focus-visible:ring-red-500',
  },
  [AttendanceStatus.ClockedOut]: {
    label: 'Clock In',
    className: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-600',
  },
};

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const ActionButton: React.FC<ActionButtonProps> = ({ status, onClick, isLoading }) => {
  const config = buttonConfig[status === AttendanceStatus.ClockedIn ? AttendanceStatus.ClockedIn : AttendanceStatus.ClockedOut];

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${config.className} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {isLoading ? <LoadingSpinner /> : null}
      {isLoading ? 'Processing...' : config.label}
    </button>
  );
};
