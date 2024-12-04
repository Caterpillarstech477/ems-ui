import { Component } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-employee-profile-management',
  templateUrl: './employee-profile-management.component.html',
  styleUrls: ['./employee-profile-management.component.css']
})
export class EmployeeProfileManagementComponent {
  employees = [
    { 
      first_name: 'Ravi',
      last_name: 'Kumar',
      gender: 'Male',
      dob: '1985-06-15',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '123 Main St, City',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postal_code: '600001',
      country: 'India',
      job_title: 'Manager',
      ni_number: 'NI123456',
      salary: '60000',
      employment_type: 'Full-time',
      employment_status: 'Active',
      hiring_date: '2010-03-25'
    },
    { 
      first_name: 'Hari',
      last_name: 'Verma',
      gender: 'Male',
      dob: '1990-04-22',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '456 Secondary St, City',
      city: 'Bangalore',
      state: 'Karnataka',
      postal_code: '560001',
      country: 'India',
      job_title: 'HR',
      ni_number: 'NI789456',
      salary: '45000',
      employment_type: 'Part-time',
      employment_status: 'Active',
      hiring_date: '2015-08-12'
    },
    { 
      first_name: 'Pavan',
      last_name: 'Reddy',
      gender: 'Male',
      dob: '1992-01-10',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '789 Tertiary St, City',
      city: 'Hyderabad',
      state: 'Telangana',
      postal_code: '500001',
      country: 'India',
      job_title: 'Developer',
      ni_number: 'NI147852',
      salary: '55000',
      employment_type: 'Full-time',
      employment_status: 'Active',
      hiring_date: '2016-06-30'
    },
    { 
      first_name: 'Venkat',
      last_name: 'Singh',
      gender: 'Male',
      dob: '1993-07-18',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '101 Quaternary St, City',
      city: 'Mumbai',
      state: 'Maharashtra',
      postal_code: '400001',
      country: 'India',
      job_title: 'Designer',
      ni_number: 'NI159753',
      salary: '50000',
      employment_type: 'Freelancer',
      employment_status: 'Inactive',
      hiring_date: '2018-02-10'
    },
    { 
      first_name: 'Purna',
      last_name: 'Sharma',
      gender: 'Female',
      dob: '1988-11-30',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '202 Quinary St, City',
      city: 'Delhi',
      state: 'Delhi',
      postal_code: '110001',
      country: 'India',
      job_title: 'Accountant',
      ni_number: 'NI963852',
      salary: '40000',
      employment_type: 'Full-time',
      employment_status: 'Active',
      hiring_date: '2012-09-05'
    },
    { 
      first_name: 'Shalini',
      last_name: 'Patel',
      gender: 'Female',
      dob: '1987-03-25',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '303 Senary St, City',
      city: 'Kolkata',
      state: 'West Bengal',
      postal_code: '700001',
      country: 'India',
      job_title: 'Team Leader',
      ni_number: 'NI741963',
      salary: '75000',
      employment_type: 'Full-time',
      employment_status: 'Active',
      hiring_date: '2011-01-14'
    },
    { 
      first_name: 'Rushi',
      last_name: 'Bhat',
      gender: 'Male',
      dob: '1995-08-22',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '404 Septenary St, City',
      city: 'Chandigarh',
      state: 'Punjab',
      postal_code: '160001',
      country: 'India',
      job_title: 'Assistant',
      ni_number: 'NI753951',
      salary: '35000',
      employment_type: 'Intern',
      employment_status: 'Active',
      hiring_date: '2020-11-01'
    },
    { 
      first_name: 'John',
      last_name: 'Doe',
      gender: 'Male',
      dob: '1994-12-12',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '505 Octonary St, City',
      city: 'Pune',
      state: 'Maharashtra',
      postal_code: '411001',
      country: 'India',
      job_title: 'Help Desk',
      ni_number: 'NI369258',
      salary: '30000',
      employment_type: 'Part-time',
      employment_status: 'Inactive',
      hiring_date: '2019-05-20'
    },
    { 
      first_name: 'Kenny',
      last_name: 'Williams',
      gender: 'Male',
      dob: '1989-02-14',
      mobile_number: '9988776655',
      email: 'info@caterpillarstech.com',
      emergency_number: '9988776655',
      address: '606 Nonary St, City',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postal_code: '600002',
      country: 'India',
      job_title: 'Senior Developer',
      ni_number: 'NI852963',
      salary: '90000',
      employment_type: 'Full-time',
      employment_status: 'Active',
      hiring_date: '2014-11-19'
    }
  ];
modalRef :BsModalRef<any> | null = null;
 addEmployeeForm: FormGroup = this.fb.group({});
 isSubmitted = false;
 isModalOpen=false;
 config = {
  backdrop: true,
  ignoreBackdropClick: true,
  class: 'modal-md'
};
 constructor(private modalService: BsModalService,private fb: FormBuilder,) { }

 ngOnInit() {
  this.initCreateFollowupactionForm()
}
initCreateFollowupactionForm() {
  this.addEmployeeForm = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Validating mobile number
    email: ['', [Validators.required, Validators.email]], // Validating email format
    emergency_number: ['', [Validators.pattern('^[0-9]*$')]], // Validating emergency number
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postal_code: ['', [Validators.required]],
    country: ['', [Validators.required]],
    job_title: ['', [Validators.required]],
    ni_number: ['', [Validators.required]],
    salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Salary must be a number
    employment_type: ['', [Validators.required]],
    employment_status: ['', [Validators.required]],
    hiring_date: ['', [Validators.required]]
  });
}
get f1() { return this.addEmployeeForm.controls; }
  openCreateFormModal(template: TemplateRef<any>, type = '') {
    this.modalRef = this.modalService.show(template, this.config);
    //this.initCreateFollowupactionForm();
  }
  closeCreateFormModal() {
    if (this.modalRef) {
      this.modalRef.hide(); // Ensure `modalRef` is not null
      this.modalRef = null; // Reset it to null
    }
    this.isSubmitted = false;
    this.isModalOpen = false;
  }
  addEmployee(){
    console.log("added")
  }
  // addEmployee() {
  //   console.log('Add Employee button clicked');
  // }

  
  onView(employee: any) {
    //console.log('View clicked for:', employee);
    
    
  }

  
  onEdit(employee: any) {
    console.log('Edit clicked for:', employee);
  }

  onDelete(employee: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${employee.name}?`);
    if (confirmDelete) {
      this.employees = this.employees.filter(emp => emp !== employee);
      console.log(`${employee.name} deleted successfully.`);
    }
  }

}
