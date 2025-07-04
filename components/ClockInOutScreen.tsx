import React, { useState, useCallback } from 'react';
import { AttendanceStatus, LogEntry, Employee } from '../types';
import { Clock } from './Clock';
import { StatusCard } from './StatusCard';
import { ActionButton } from './ActionButton';
import { LogItem } from './LogItem';
import { CameraModal } from './CameraModal';

interface ClockInOutScreenProps {
    employee: Employee;
    activityLog: LogEntry[];
    status: AttendanceStatus;
    onAddLogEntry: (logEntry: Omit<LogEntry, 'id'>) => void;
}

export const ClockInOutScreen: React.FC<ClockInOutScreenProps> = ({ employee, activityLog, status, onAddLogEntry }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
    const [pendingAction, setPendingAction] = useState<AttendanceStatus | null>(null);

    const handleCaptureConfirm = useCallback((photoDataUrl: string) => {
        if (!pendingAction || !employee) return;

        setIsCameraOpen(false);
        setIsLoading(true);

        setTimeout(() => {
            const newLogEntry = {
                status: pendingAction,
                timestamp: new Date(),
                photo: photoDataUrl,
                employeeId: employee.id,
                employeeName: `${employee.firstName} ${employee.lastName}`,
            };
            onAddLogEntry(newLogEntry);
            setIsLoading(false);
            setPendingAction(null);
        }, 1200);
    }, [pendingAction, employee, onAddLogEntry]);

    const handleClockAction = useCallback(() => {
        const nextAction = status === AttendanceStatus.ClockedOut
            ? AttendanceStatus.ClockedIn
            : AttendanceStatus.ClockedOut;

        setPendingAction(nextAction);
        setIsCameraOpen(true);
    }, [status]);

    const handleCameraClose = useCallback(() => {
        setIsCameraOpen(false);
        setPendingAction(null);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center space-y-8">
                <div className="w-full pt-8 pb-4">
                    <Clock />
                </div>
                
                <div className="w-full max-w-2xl p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 space-y-6">
                    <StatusCard status={status} />
                    <ActionButton
                        status={status}
                        onClick={handleClockAction}
                        isLoading={isLoading}
                    />
                </div>

                {activityLog.length > 0 && (
                    <div className="w-full max-w-2xl p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Today's Activity</h2>
                        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                            {activityLog.map((log) => (
                                <LogItem key={log.id} log={log} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <CameraModal
                isOpen={isCameraOpen}
                action={pendingAction}
                onClose={handleCameraClose}
                onCapture={handleCaptureConfirm}
            />
        </>
    );
};
