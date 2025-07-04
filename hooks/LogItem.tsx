import React from 'react';
import { LogEntry, AttendanceStatus } from '../types';
import { Icon } from './Icon';

interface LogItemProps {
  log: LogEntry;
}

const logConfig = {
  [AttendanceStatus.ClockedIn]: {
    iconPath: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
    iconColor: 'text-emerald-500',
    title: 'Clocked In',
  },
  [AttendanceStatus.ClockedOut]: {
    iconPath: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z',
    iconColor: 'text-red-500',
    title: 'Clocked Out',
  },
};

export const LogItem: React.FC<LogItemProps> = ({ log }) => {
  const config = logConfig[log.status];
  const time = log.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <li className="flex items-center space-x-4 py-3">
      {log.photo ? (
        <img src={log.photo} alt={`${log.employeeName} snapshot`} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800`}>
          <Icon path={config.iconPath} className={`w-5 h-5 ${config.iconColor}`} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{config.title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{log.employeeName}</p>
      </div>
      <div className="text-sm font-mono text-slate-500 dark:text-slate-400">
        {time}
      </div>
    </li>
  );
};
