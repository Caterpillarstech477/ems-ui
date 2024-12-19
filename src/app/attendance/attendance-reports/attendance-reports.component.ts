import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.css']
})
export class AttendanceReportsComponent {

  employees = [
    {
      date:'2024-12-16',
      employee_name: 'Gayathri',
      role:'Design',
      status:'Present',
      check_in:'09:00 AM',
      check_out:'6.00PM',
      work_hours:'9 Hours'
    },
    {
      date:'2024-12-16',
      employee_name: 'Venkatesh',
      role:'Manager',
      status:'Present',
      check_in:'09:00 AM',
      check_out:'6.00PM',
      work_hours:'9 Hours'
    }
  ];

  modalRef: BsModalRef | null = null;
  attendenceReportForm!: FormGroup;
  isViewMode = false;
  isEditMode = false;
  selectedBenefit: any = null;
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
    this.attendenceReportForm = this.fb.group({
      date: [''],
      employee_name: [''],
      role: [''],
      status: [''],
      check_in: [''],
      check_out: [''],
      work_hours: ['']
    });
  }

  get f() {
    return this.attendenceReportForm.controls;
  }

  openCreateFormModal(template: TemplateRef<any>, type: string = '', benefit: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedBenefit = benefit;

    if (benefit) {
      this.attendenceReportForm.patchValue(benefit);
    } else {
      this.attendenceReportForm.reset();
    }

    if (this.isViewMode) {
      this.attendenceReportForm.disable();
    } else {
      this.attendenceReportForm.enable();
    }
  }

  closeCreateFormModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = null;
    }
    this.isViewMode = false;
    this.isEditMode = false;
    this.selectedBenefit = null;
    this.cdr.detectChanges();
  }

  addBenefit() {
    this.employees.push(this.attendenceReportForm.value);
    this.closeCreateFormModal();
  }

  updateBenefit() {
    if (this.selectedBenefit) {
      const index = this.employees.findIndex(
        b => b.employee_name === this.selectedBenefit.employee_name && b.employee_name === this.selectedBenefit.employee_name
      );
      if (index > -1) {
        this.employees[index] = this.attendenceReportForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  onDelete(benefit: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${benefit.employee_name}'s record?`);
    if (confirmDelete) {
      this.employees = this.employees.filter(b => b.employee_name !== benefit.employee_name);
    }
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    this.filterAttendanceByDate(selectedDate);
  }

  filterAttendanceByDate(date: string) {
    this.employees = this.employees.filter(employee => employee.date === date);
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

  

  openManualAttendance() {
    console.log('Manual Attendance button clicked!');
  }
}
