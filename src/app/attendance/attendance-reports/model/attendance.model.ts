export class Attendance {
    constructor(
        public attendanceId: bigint,
        public employeeId: string, 
        public attendanceDate: string,
        public check_in: string,
        public check_out: string,
        public role: string,
        public status: string,
        public work_hours: string,
        public remarks: string,
        public email:string
    ) { }
}