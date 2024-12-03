import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-balance-management',
  templateUrl: './leave-balance-management.component.html',
  styleUrls: ['./leave-balance-management.component.css']
})
export class LeaveBalanceManagementComponent {
  leaveRequests = [
    {
      employeeName: 'Ravi',
      employeeId: '09761',
      department: 'Design',
      role: 'Manager',
      pendingLeaves: 24,
    },
    {
      employeeName: 'Hari',
      employeeId: '098754',
      department: 'Development',
      role: 'HR',
      pendingLeaves: 16,
    },
    {
      employeeName: 'Pavan',
      employeeId: '097524',
      department: 'Marketing',
      role: 'Developer',
      pendingLeaves: 18,
    },
    {
      employeeName: 'Venkat',
      employeeId: '09786',
      department: 'Accounts',
      role: 'Designer',
      pendingLeaves: 10,
    },
    {
      employeeName: 'Purna',
      employeeId: '0988990',
      department: 'Development',
      role: 'Accountant',
      pendingLeaves: 16,
    },
    {
      employeeName: 'Shalini',
      employeeId: '0976',
      department: 'Accounts',
      role: 'Team Leader',
      pendingLeaves: 18,
    },
    {
      employeeName: 'Rushi',
      employeeId: '09767',
      department: 'Development',
      role: 'Assistant',
      pendingLeaves: 13,
    },
    {
      employeeName: 'John',
      employeeId: '09112',
      department: 'Accounts',
      role: 'Hep Desk',
      pendingLeaves: 11,
    },
    {
      employeeName: 'Kenny',
      employeeId: '09234',
      department: 'Accounts',
      role: 'SR Developer',
      pendingLeaves: 8,
    },
    {
      employeeName: 'Purna',
      employeeId: '09356',
      department: 'Design',
      role: 'Accountant',
      pendingLeaves: 9,
    },
  ];

  leaveTypes = ['Annual Leave', 'Sick Leave', 'Casual Leave'];

  selectedDateRange: Date[] = [];
  selectedLeaveType!: string;
  selectedExportOption!: string;

  onView(request: any) {
    console.log('View:', request);
  }

  onEdit(request: any) {
    console.log('Edit:', request);
  }

  onDelete(request: any) {
    console.log('Delete:', request);
  }

}
