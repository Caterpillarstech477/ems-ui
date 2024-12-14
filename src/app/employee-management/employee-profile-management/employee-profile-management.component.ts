import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './model/employee.model'; // Adjust path as needed

@Component({
  selector: 'app-employee-profile-management',
  templateUrl: './employee-profile-management.component.html',
  styleUrls: ['./employee-profile-management.component.css']
})
export class EmployeeProfileManagementComponent {
  private EMPLOYEE_REST_API_URL = 'http://localhost:8080/api/employees';  // URL to REST api
  employees: Employee[] = []; // Array of Employee objects
    // Hardcoded employee data (you can add more)
  
    // Add more employees here if needed

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

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.initEmployeeForm();
  }

  initEmployeeForm() {
    this.addEmployeeForm = this.fb.group({

      // {
      //   "first_name" : "Satya Kumar",
      //   "last_name" : "Kota",
      //   "gender" : "Femal",
      //   "date_of_birth" : "1993-06-12",
      //   "email" : "kotasunilkumar3@gmail.com",
      //   "phone_number" : "9493692077",
      //   "hire_dateStr" : "1993-06-12"
      // }

      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emergency_phone: ['', [Validators.pattern('^[0-9]*$')]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      country: ['', [Validators.required]],
      job_title: ['', [Validators.required]],
      ni_number: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      employment_type: ['', [Validators.required]],
      employment_status: ['', [Validators.required]],
      hire_dateStr: ['', [Validators.required]]
    });
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

  addEmployee() {
    console.log('calling addEmployee', this.addEmployeeForm.value);

    const employee: Employee = this.addEmployeeForm.value as Employee;
    console.log('Form Submitted and converted into employee object', employee);

    this.httpClient
    .post<Employee>(this.EMPLOYEE_REST_API_URL, employee)
    .subscribe(response => {
         console.log('Employee saved successfully', response);
         this.employees.push(response);
    });

      
      console.log('this.employees', this.employees);
      this.closeCreateFormModal();
    // }
  }

  updateEmployee() {
    if (this.addEmployeeForm.valid && this.selectedEmployee) {
      const index = this.employees.findIndex(emp => emp === this.selectedEmployee);
      if (index > -1) {
        this.employees[index] = this.addEmployeeForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  onDelete(employee: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`);
    if (confirmDelete) {
      this.employees = this.employees.filter(emp => emp !== employee);
    }
  }
}
