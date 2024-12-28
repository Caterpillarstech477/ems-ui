export class Employee {
    constructor(
        public employeeId: bigint,
        public first_name: string, 
        public last_name: string, 
        public gender: string, 
        public date_of_birth: string, 
        public email: string, 
        public phone_number: string, 
        public address: string, 
        public city: string, 
        public state: string, 
        public postal_code: string, 
        public country: string, 
        public job_title: string, 
        public ni_number: string, 
        public salary: string, 
        public employment_type: string,
        public status: string,
        public hireDateStr: string,
        public emergency_phone?: string
    ) { }
}