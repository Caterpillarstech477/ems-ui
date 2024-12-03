import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-requests-report',
  templateUrl: './leave-requests-report.component.html',
  styleUrls: ['./leave-requests-report.component.css']
})
export class LeaveRequestsReportComponent {
  
  leaveRequests = [
    { 
      sno: 1, 
      employeeName: 'Ravi', 
      employeeId: '09761', 
      department: 'Design', 
      role: 'Manager', 
      leaveType: 'Medical', 
      status: 'Approved' 
    },
    { 
      sno: 2, 
      employeeName: 'Hari', 
      employeeId: '098754', 
      department: 'Development', 
      role: 'HR', 
      leaveType: 'Casual', 
      status: 'Approved' 
    },
    { 
      sno: 3, 
      employeeName: 'Pavan', 
      employeeId: '097524', 
      department: 'Marketing', 
      role: 'Developer', 
      leaveType: 'Medical', 
      status: 'Pending' 
    },
    { 
      sno: 4, 
      employeeName: 'Venkat', 
      employeeId: '09786', 
      department: 'Accounts', 
      role: 'Designer', 
      leaveType: 'Emergency', 
      status: 'Approved' 
    },
    { 
      sno: 5, 
      employeeName: 'Purna', 
      employeeId: '0988990', 
      department: 'Development', 
      role: 'Accountant', 
      leaveType: 'Medical', 
      status: 'Pending' 
    },
  ];
  leaveTypes: string[] = ['Sick Leave', 'Casual Leave', 'Maternity Leave', 'Annual Leave']; // Example leave types
  selectedDateRange: Date[] = [];
  selectedLeaveType: string = '';  
  selectedExportOption: string = 'pdf';
  onView(request: any): void {
    console.log('View clicked:', request); 
  }

  onEdit(request: any): void {
    console.log('Edit clicked:', request);
  }

  onDelete(request: any): void {
    console.log('Delete clicked:', request);
  }
  onExport() {
    if (this.selectedExportOption === 'pdf') {
      console.log('Exporting as PDF');
    } else if (this.selectedExportOption === 'excel') {
      console.log('Exporting as Excel');
    }
  }

}
