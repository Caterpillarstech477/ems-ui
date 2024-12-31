import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Employee } from './model/Employee.model';

@Component({
  selector: 'app-employee-profile-management',
  templateUrl: './employee-profile-management.component.html',
  styleUrls: ['./employee-profile-management.component.css']
})
export class EmployeeProfileManagementComponent {
  private EMPLOYEE_REST_API_URL = 'http://localhost:8080/api/employees';  // URL to REST api
  employees: Employee[] = []; // Array of Employee objects
 
  // employees = [
  //   // Hardcoded employee data (you can add more)
  //   {
  //     firstname: 'Ravi',
  //     lastname: 'Kumar',
  //     gender: 'Male',
  //     dob: '1985-06-15',
  //     mobile_number: '9988776655',
  //     email: 'info@caterpillarstech.com',
  //     emergency_number: '9988776655',
  //     address: '123 Main St, City',
  //     city: 'Chennai',
  //     state: 'Tamil Nadu',
  //     postalcode: '600001',
  //     country: 'India',
  //     jobtitle: 'Manager',
  //     ninumber: 'NI123456',
  //     salary: '60000',
  //     employmenttype: 'Full-time',
  //     employment_status: 'Active',
  //     hiring_date: '2010-03-25'
  //   }
  //   // Add more employees here if needed
  // ];

  modalRef: BsModalRef | null = null;
  addEmployeeForm: FormGroup = this.fb.group({});
  isSubmitted = false;
  isModalOpen = false;
  isViewMode = false;
  isEditMode = false;
  selectedEmployee: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };
  public getJsonValue:any
  public postJsonValue:any
  termsVisible: boolean = false;
  isAgreed: boolean = false;

  constructor(private modalService: BsModalService, private fb: FormBuilder,private http: HttpClient) {}

  ngOnInit() {
    this.initEmployeeForm();
    this.getEmployee();
    // this.getMethod()
    // this.postMethod()
  }
  // public getMethod(){
  //   this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe((data)=>{
  //     console.log('data',data)
  //   })
  // }
  // public postMethod(){
  //   const header =new HttpHeaders({
  //     contentType:'application/json'

  //   })
  //   let body ={
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1
  //   }
  //   this.http.post('https://jsonplaceholder.typicode.com/posts',body,{headers:header}).subscribe((data)=>{
  //     console.log('data',data)
  //   })
  
    
  // }

  initEmployeeForm() {
    
      this.addEmployeeForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        emergencyPhone: ['', [Validators.pattern('^[0-9]*$')]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        jobTitle: ['', [Validators.required]],
        niNumber: ['', [Validators.required]],
        salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        employmentType: ['', [Validators.required]],
        status: ['', [Validators.required]],
        hireDate: ['']
    });
        
    //});
  }

  get f() {
    return this.addEmployeeForm.controls;
  }
  

  openCreateFormModal(template: TemplateRef<any>, type: string = '', employee: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isModalOpen = true;
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedEmployee = employee;

    if (employee) {
      this.addEmployeeForm.patchValue(employee); // Populate form with employee data
    } else {
      this.addEmployeeForm.reset();
    }

    if (this.isViewMode) {
      this.addEmployeeForm.disable(); // Disable form for view mode
    } else {
      this.addEmployeeForm.enable(); // Enable form for edit/add modes
    }
  }

  closeCreateFormModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = null;
    }
    this.isSubmitted = false;
    this.isModalOpen = false;
    this.isViewMode = false;
    this.isEditMode = false;
    this.selectedEmployee = null;
  }
  getEmployee(){
    this.http.get<Employee[]>(this.EMPLOYEE_REST_API_URL).subscribe(
      data => {
        this.employees = data;
        
        console.log('Employees loaded successfully', this.employees);
      },
      error => {
        console.error('Error loading employees', error);
        // alert('Failed to load employees. Please try again later.');
      }
    );
  }

  addEmployee() {
    
    console.log('calling addEmployee', this.addEmployeeForm.value);
    const employee: Employee = this.addEmployeeForm.value as Employee;
    console.log('Form Submitted and converted into employee object', employee);

    this.http
    .post<Employee>(this.EMPLOYEE_REST_API_URL, employee)
    .subscribe(response => {
         console.log('Employee saved successfully', response);
         this.employees.push(response);
    });
    // if (this.addEmployeeForm.valid) {
      //this.employees.push(this.addEmployeeForm.value);
      console.log('this.employees', this.employees);

      this.closeCreateFormModal();
    // }
  }
  showTermsAndPolicies() {
    this.termsVisible = !this.termsVisible;
  }

  // updateEmployee() {
  //   if (this.addEmployeeForm.valid && this.selectedEmployee) {
  //     const index = this.employees.findIndex(emp => emp === this.selectedEmployee);
  //     if (index > -1) {
  //       this.employees[index] = this.addEmployeeForm.value;
        
  //       this.closeCreateFormModal();
  //     }
  //   }
  // }
  
  updateEmployee() {
    
    if (this.addEmployeeForm.valid && this.selectedEmployee) {
      const updatedEmployee: Employee = {
        ...this.selectedEmployee,
        ...this.addEmployeeForm.value
      };
  
      this.http
        .put<Employee>(`${this.EMPLOYEE_REST_API_URL}`, updatedEmployee) // Send the updated employee object
        .subscribe(
          response => {
            const index = this.employees.findIndex(emp => emp.employeeId === updatedEmployee.employeeId);
  
            if (index > -1) {
              this.employees[index] = response;
            } else {
              console.error('Employee not found in local array');
            }
          console.log("updated",updatedEmployee)
  
            this.closeCreateFormModal();
          },
          error => {
            console.error('Error updating employee:', error);
          }
        );
    } else {
      console.error('Form is invalid or selectedEmployee is missing');
    }
  }
  
  
  

  // onDelete(employee: any) {
  //   const confirmDelete = confirm(`Are you sure you want to delete ${employee.firstname} ${employee.lastname}?`);
  //   if (confirmDelete) {
  //     this.employees = this.employees.filter(emp => emp !== employee);
  //   }
  // }
  onDelete(employee: Employee) {
    const confirmDelete = confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`);
    if (confirmDelete) {
      this.http.delete(`${this.EMPLOYEE_REST_API_URL}/${employee.employeeId}`).subscribe(
        () => {
          // Remove the employee from the local array after successful deletion
          this.employees = this.employees.filter(emp => emp.employeeId !== employee.employeeId);
        },
        error => {
          alert('Failed to delete employee. Please try again later.');
        }
      );
    }
  }
  
}
