import React from 'react';
import { AttendanceStatus } from '../types';
import { Icon } from './Icon';

interface StatusCardProps {
  status: AttendanceStatus;
}

const statusConfig = {
  [AttendanceStatus.ClockedIn]: {
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-300',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    message: 'You are currently clocked in. Have a productive day!',
  },
  [AttendanceStatus.ClockedOut]: {
    bgColor: 'bg-slate-100 dark:bg-slate-800/60',
    borderColor: 'border-slate-200 dark:border-slate-700',
    textColor: 'text-slate-600 dark:text-slate-300',
    iconColor: 'text-slate-500 dark:text-slate-400',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13H7v-2h10v2z',
    message: 'You are currently clocked out. Ready to start your shift?',
  },
};

export const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <div className={`w-full p-4 rounded-lg border ${config.bgColor} ${config.borderColor} flex items-center space-x-4 transition-all duration-300`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.iconColor}`}>
        <Icon path={config.iconPath} className="w-6 h-6" />
      </div>
      <div>
        <h3 className={`font-bold text-lg ${config.textColor}`}>{status}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{config.message}</p>
      </div>
    </div>
  );
};
