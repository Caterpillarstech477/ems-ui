import { Component, TemplateRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-leave-balance-management',
  templateUrl: './leave-balance-management.component.html',
  styleUrls: ['./leave-balance-management.component.css']
})
export class LeaveBalanceManagementComponent {
   
    employees = [
       {
         employee_name:'Gayathri',
         employee_id: '121',
         department:'Design',
         role:'Developer',
         pending_leave:'10'
         
       },
       {
        employee_name:'Kushal',
        employee_id: '121',
        department:'Design',
        role:'Intern',
        pending_leave:'15'
        
      }
     ];
   
     modalRef: BsModalRef | null = null;
     leaverequestform!: FormGroup;
     isViewMode = false;
     isEditMode = false;
     selectedEmployee: any = null;
     config = {
       backdrop: true,
       ignoreBackdropClick: true,
       class: 'modal-md'
     };
   
     constructor(private modalService: BsModalService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}
   
     ngOnInit() {
       this.initBenefitForm();
     }
   
     initBenefitForm() {
       this.leaverequestform = this.fb.group({
        employee_name:[''],
         employee_id: [''],
         department:[''],
         role:[''],
         pending_leave:[]
       });
     }
   
     get f() {
       return this.leaverequestform.controls;
     }
   
     openCreateFormModal(template: TemplateRef<any>, type: string = '', employee: any = null) {
       this.modalRef = this.modalService.show(template, this.config);
       this.isViewMode = type === 'view';
       this.isEditMode = type === 'edit';
       this.selectedEmployee = employee;
   
       if (employee) {
         this.leaverequestform.patchValue(employee);
       } else {
         this.leaverequestform.reset();
       }
   
       if (this.isViewMode) {
         this.leaverequestform.disable();
       } else {
         this.leaverequestform.enable();
       }
     }
   
     closeCreateFormModal() {
       if (this.modalRef) {
         this.modalRef.hide();
         this.modalRef = null;
       }
       this.isViewMode = false;
       this.isEditMode = false;
       this.selectedEmployee = null;
       this.cdr.detectChanges();
     }
   
     addLeaveRequest() {
       this.employees.push(this.leaverequestform.value);
       this.closeCreateFormModal();
     }
   
     updateLeaveRequest() {
       if (this.selectedEmployee) {
         const index = this.employees.findIndex(
           b => b.employee_name === this.selectedEmployee.employee_name && b.employee_name === this.selectedEmployee.employee_name
         );
         if (index > -1) {
           this.employees[index] = this.leaverequestform.value;
           this.closeCreateFormModal();
         }
       }
     }
   
     onDelete(employee: any) {
       const confirmDelete = confirm(`Are you sure you want to delete ${employee.employee_name}'s record?`);
       if (confirmDelete) {
         this.employees = this.employees.filter(b => b.employee_name !== employee.employee_name);
       }
     }
   
     
   
     exportAttendanceReport(event: any) {
       const selectedFormat = event.target.value;
       if (selectedFormat === 'pdf') {
         this.exportAsPDF();
       } else if (selectedFormat === 'csv') {
         this.exportAsCSV();
       } 
     }
   
     exportAsPDF() {
       console.log('Exporting as PDF...');
     }
   
     exportAsCSV() {
       console.log('Exporting as CSV...');
     }
   
     
   
     
   }
   