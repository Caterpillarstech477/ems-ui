import { Component, TemplateRef } from '@angular/core';
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
    // Hardcoded employee data (you can add more)
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
    }
    // Add more employees here if needed
  ];

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

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initEmployeeForm();
  }

  initEmployeeForm() {
    this.addEmployeeForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      emergency_number: ['', [Validators.pattern('^[0-9]*$')]],
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
      hiring_date: ['', [Validators.required]]
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
    if (this.addEmployeeForm.valid) {
      this.employees.push(this.addEmployeeForm.value);
      this.closeCreateFormModal();
    }
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
