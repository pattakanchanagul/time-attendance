export enum AttendanceStatus {
  ClockedIn = 'Clocked In',
  ClockedOut = 'Clocked Out',
}

export interface Employee {
  id: string; // National ID
  firstName: string;
  lastName: string;
  photoUrl: string; // base64 data URL
}

export interface LogEntry {
  id: number;
  status: AttendanceStatus;
  timestamp: Date;
  photo?: string; // Clock-in/out snapshot
  employeeId: string;
  employeeName: string;
}
