import React, { useState, useCallback } from 'react';
import { Employee } from '../types';
import { CameraModal } from './CameraModal';

interface AdminPanelProps {
  employees: Employee[];
  onAddEmployee: (employee: Employee) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ employees, onAddEmployee }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeePhoto, setEmployeePhoto] = useState<string | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const handleTakePhotoClick = () => {
    setIsCameraModalOpen(true);
  };

  const handleCloseCamera = useCallback(() => {
    setIsCameraModalOpen(false);
  }, []);

  const handlePhotoCapture = useCallback((imageDataUrl: string) => {
    setEmployeePhoto(imageDataUrl);
    setIsCameraModalOpen(false);
  }, []);

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 13) {
      setEmployeeId(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !employeeId || !employeePhoto) {
      alert('Please fill out all fields and take a photo.');
      return;
    }
    if (employeeId.length !== 13) {
      alert('Employee ID must be exactly 13 digits.');
      return;
    }
    onAddEmployee({
      id: employeeId,
      firstName,
      lastName,
      photoUrl: employeePhoto,
    });
    // Reset form
    setFirstName('');
    setLastName('');
    setEmployeeId('');
    setEmployeePhoto(null);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Add New Employee</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name (ชื่อจริง)" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="text" placeholder="Last Name (นามสกุล)" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <input 
              type="text" 
              placeholder="Employee ID (หมายเลขบัตรประชาชน 13 หลัก)" 
              value={employeeId} 
              onChange={handleEmployeeIdChange} 
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
              maxLength={13}
              minLength={13}
              pattern="\d{13}"
              title="Employee ID must be 13 digits."
            />
            <div className="flex items-center gap-4">
               <button 
                  type="button" 
                  onClick={handleTakePhotoClick} 
                  className="cursor-pointer px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                >
                  Take Photo
                </button>
               {employeePhoto && <img src={employeePhoto} alt="Preview" className="w-16 h-16 rounded-full object-cover"/>}
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Employee</button>
          </form>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Employee List</h2>
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {employees.map(emp => (
              <li key={emp.id} className="flex items-center space-x-4 py-3">
                <img src={emp.photoUrl} alt={`${emp.firstName}'s photo`} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{emp.firstName} {emp.lastName}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">{emp.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={handleCloseCamera}
        onCapture={handlePhotoCapture}
        modalTitle="Capture Employee Photo"
        captureButtonText="Set as Profile Photo"
      />
    </>
  );
};