import React from 'react';
import { Employee } from '../types';

interface EmployeeSelectionProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
}

export const EmployeeSelection: React.FC<EmployeeSelectionProps> = ({ employees, onSelectEmployee }) => {
  return (
    <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">Welcome to AutoFast</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10">Please select your profile to continue.</p>
        
        {employees.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {employees.map(employee => (
                    <div 
                        key={employee.id} 
                        onClick={() => onSelectEmployee(employee)}
                        className="cursor-pointer group flex flex-col items-center p-4 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                    >
                        <img 
                            src={employee.photoUrl} 
                            alt={`${employee.firstName} ${employee.lastName}`}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300"
                        />
                        <p className="font-semibold text-slate-800 dark:text-slate-100 text-center">{employee.firstName}</p>
                        <p className="font-medium text-slate-600 dark:text-slate-300 text-center">{employee.lastName}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="mt-16 text-center">
                <p className="text-slate-500 dark:text-slate-400">No employees have been added yet.</p>
                <p className="text-slate-500 dark:text-slate-400">An administrator needs to add employees from the Admin Panel.</p>
            </div>
        )}
    </div>
  );
};
