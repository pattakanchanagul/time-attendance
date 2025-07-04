import React, { useState, useCallback, useMemo } from 'react';
import { AttendanceStatus, LogEntry, Employee } from './types';
import { Header } from './components/Header';
import { AdminPanel } from './components/AdminPanel';
import { EmployeeSelection } from './components/EmployeeSelection';
import { ClockInOutScreen } from './components/ClockInOutScreen';

// Mock data for initial employees
const initialEmployees: Employee[] = [
    {
        id: '1234567890123',
        firstName: 'Alex',
        lastName: 'Hartman',
        photoUrl: 'https://picsum.photos/id/237/200/200'
    },
    {
        id: '9876543210987',
        firstName: 'Jane',
        lastName: 'Doe',
        photoUrl: 'https://picsum.photos/id/1027/200/200'
    }
];

export default function App() {
  const [view, setView] = useState<'employee_selection' | 'clock' | 'admin'>('employee_selection');
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activityLog, setActivityLog] = useState<LogEntry[]>([]);

  const handleToggleView = useCallback(() => {
    setView(prev => (prev === 'admin' ? (selectedEmployee ? 'clock' : 'employee_selection') : 'admin'));
  }, [selectedEmployee]);
  
  const handleLogout = useCallback(() => {
      setSelectedEmployee(null);
      setView('employee_selection');
  }, []);

  const handleSelectEmployee = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setView('clock');
  }, []);

  const handleAddEmployee = useCallback((newEmployee: Employee) => {
    setEmployees(prev => {
        // Prevent adding duplicate employee IDs
        if (prev.some(e => e.id === newEmployee.id)) {
            alert('An employee with this ID already exists.');
            return prev;
        }
        return [...prev, newEmployee]
    });
    alert('Employee added successfully!');
  }, []);
  
  const handleAddLogEntry = useCallback((logEntry: Omit<LogEntry, 'id'>) => {
      setActivityLog(prev => [{ ...logEntry, id: Date.now() }, ...prev]);
  }, []);

  const employeeActivityLog = useMemo(() => {
    if (!selectedEmployee) return [];
    return activityLog.filter(log => log.employeeId === selectedEmployee.id);
  }, [activityLog, selectedEmployee]);

  const employeeStatus = useMemo(() => {
    const lastEntry = employeeActivityLog[0];
    return lastEntry?.status || AttendanceStatus.ClockedOut;
  }, [employeeActivityLog]);

  const renderContent = () => {
    if (view === 'admin') {
      return <AdminPanel employees={employees} onAddEmployee={handleAddEmployee} />;
    }
    if (view === 'employee_selection' || !selectedEmployee) {
      return <EmployeeSelection employees={employees} onSelectEmployee={handleSelectEmployee} />;
    }
    if (view === 'clock' && selectedEmployee) {
      return (
        <ClockInOutScreen 
            employee={selectedEmployee}
            activityLog={employeeActivityLog}
            status={employeeStatus}
            onAddLogEntry={handleAddLogEntry}
        />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header 
        employee={selectedEmployee}
        onToggleView={handleToggleView}
        onLogout={handleLogout}
        currentView={view === 'admin' ? 'admin' : 'clock'}
      />
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {renderContent()}
      </main>
    </div>
  );
}
