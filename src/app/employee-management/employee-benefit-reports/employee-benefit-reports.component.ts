import { Component ,OnInit, ViewContainerRef} from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-benefit-reports',
  templateUrl: './employee-benefit-reports.component.html',
  styleUrls: ['./employee-benefit-reports.component.css']
})
export class EmployeeBenefitReportsComponent {
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

}
