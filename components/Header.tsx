import React from 'react';
import { Icon } from './Icon';
import { Employee } from '../types';

interface HeaderProps {
  employee?: Employee | null;
  onToggleView: () => void;
  onLogout: () => void;
  currentView: 'clock' | 'admin';
}

export const Header: React.FC<HeaderProps> = ({ employee, onToggleView, onLogout, currentView }) => {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 pt-6 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="AutoFast Logo" className="w-9 h-9" />
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">AutoFast</h1>
        </div>
        <div className="flex items-center space-x-4">
          {employee && (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">
                {employee.firstName} {employee.lastName}
              </span>
              <img
                className="w-9 h-9 rounded-full ring-2 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 ring-blue-500"
                src={employee.photoUrl}
                alt={`${employee.firstName}'s avatar`}
              />
               <button onClick={onLogout} title="Switch User" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Icon path="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" className="w-6 h-6 text-slate-600 dark:text-slate-300"/>
              </button>
            </div>
          )}
          <button onClick={onToggleView} title={currentView === 'admin' ? "Back to Clock View" : "Admin Panel"} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Icon path={currentView === 'admin' ? "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z" : "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"} className="w-6 h-6 text-slate-600 dark:text-slate-300"/>
          </button>
        </div>
      </div>
    </header>
  );
};
