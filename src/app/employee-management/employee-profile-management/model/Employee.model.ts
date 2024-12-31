export class Employee {
    constructor(public employeeId: bigint,public firstName: string, public lastName: string, public gender: string, public dob: string, public email: string, public phoneNumber: string, public address: string, public city: string, public state: string, public postalCode: string, public country: string, public jobTitle: string, public niNumber: string, public salary: string, public employmentType: string,
        public status: string,
        public hireDateStr: string,
        public hireDate?: string
    ) { }
}