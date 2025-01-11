export class Attendance {
    constructor(
        public attendanceId: bigint,
        public employeeId: string, 
        public attendanceDate: string,
        public inTime: string,
        public outTime: string,
        public role: string,
        public status: string,
        public work_hours: string,
        public remarks: string,
    ) { }
}