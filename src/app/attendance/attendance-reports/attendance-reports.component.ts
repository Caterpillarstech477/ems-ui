import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Attendance } from './model/attendance.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './../../util/ApiResponse.model';


@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.css']
})
export class AttendanceReportsComponent {

  private ATTENDANCE_REST_API_URL = 'http://localhost:8080/api/attendance';  // URL to REST api
  attendanceReports: Attendance[] = []; // Array of Attendance objects

  modalRef: BsModalRef | null = null;
  attendenceReportForm!: FormGroup;
  isViewMode = false;
  isEditMode = false;
  selectedAttendance: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };

  constructor(private modalService: BsModalService, private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private http: HttpClient) {}

  ngOnInit() {
    this.initattendanceForm();
  }

  initattendanceForm() {
    this.attendenceReportForm = this.fb.group({
      attendanceDate: [''],
      employeeId: [''],
      role: [''],
      status: [''],
      inTime: [''],
      outTime: [''],
      work_hours: [''],
      remarks:['']
    });
  }

  get f() {
    return this.attendenceReportForm.controls;
  }

  openCreateFormModal(template: TemplateRef<any>, type: string = '', attendance: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedAttendance = attendance;

    if (attendance) {
      this.attendenceReportForm.patchValue(attendance);
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
    this.selectedAttendance = null;
    this.cdr.detectChanges();
  }

  makeAttendance() {

    const attendance: Attendance = this.attendenceReportForm.value as Attendance;
    console.log('Form Submitted and converted into attendance object', attendance);
    //TODO : have to get it from logged in user, or 
    // has to provide via search box where user can select employeeName and we will pass corresponding employeeId to backend
    // ask user to mention his email address and that we will take it TO backend , then get the corresponding employeeId ,
    // use the same while saving into attendance table
    attendance.employeeId = "4";
    this.http.post<ApiResponse<Attendance>>(this.ATTENDANCE_REST_API_URL+"/add", attendance)
    .subscribe(response => {
          console.log('Attendance saved successfully', response);
          if(response.statusCode == 200) {
            this.attendanceReports.push(response.data);
          } else {
            //TODO : bootsstrap alert or notification or popup for the user
            console.error("Error occured while making the attaendace. please check logs");
            console.error(response);
          }
    });
    this.closeCreateFormModal();
  }

  updateAttendance() {
    if (this.selectedAttendance) {
      const index = this.attendanceReports.findIndex(
        b => b.employeeId === this.selectedAttendance.employeeId && b.employeeId === this.selectedAttendance.employeeId
      );
      if (index > -1) {
        this.attendanceReports[index] = this.attendenceReportForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  onDelete(attendance: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${attendance.employeeId}'s record?`);
    if (confirmDelete) {
      this.attendanceReports = this.attendanceReports.filter(b => b.employeeId !== attendance.employeeId);
    }
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    this.filterAttendanceByDate(selectedDate);
  }

  filterAttendanceByDate(date: string) {
    this.attendanceReports = this.attendanceReports.filter(attendanceReport => attendanceReport.attendanceDate === date);
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
