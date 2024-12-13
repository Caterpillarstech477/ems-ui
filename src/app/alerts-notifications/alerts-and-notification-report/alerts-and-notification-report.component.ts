import { Component } from '@angular/core';

@Component({
  selector: 'app-alerts-and-notification-report',
  templateUrl: './alerts-and-notification-report.component.html',
  styleUrls: ['./alerts-and-notification-report.component.css']
  
})
export class AlertsAndNotificationReportComponent {
  startDate: string | null = null; // Stores the selected start date
  endDate: string | null = null;   // Stores the selected end date

  // Data for dropdowns
  alertTypes = ['Info', 'Warning', 'Error', 'Critical'];
  exportTypes = ['PDF File', 'Excel Sheet', 'CSV File'];

  // Selected values
  selectedAlertType = '';
  selectedExportType = '';
  // startDate: string = '';
  // endDate: string = '';
  
  
  // Table data
  alerts = [
    { type: 'Info', message: 'Message 1', employeeName: 'Ravi', isRead: 'No', priorityLevel:'High' ,expireAt:'23-11-2024 23:01 PM'},
    { type: 'Warning', message: 'Message 2', employeeName: 'Hari', isRead: 'Yes', priorityLevel:'Critical' ,expireAt:'23-11-2024 22:01 PM'},
    { type: 'Error', message: 'Technical', employeeName: 'Purna', isRead: 'No', priorityLevel:'Lowest Priority' ,expireAt:'24-11-2024 23:30 PM'},
    { type: 'Info', message: 'Message 1', employeeName: 'Venkat', isRead: 'Yes', priorityLevel:'High' ,expireAt:'11-11-2024 23:01 PM'},
    { type: 'Error', message: 'Reports', employeeName: 'John', isRead: 'No', priorityLevel:'Critical' ,expireAt:'27-11-2024 23:01 PM'},
    { type: 'Warning', message: 'Report', employeeName: 'Rishi', isRead: 'Yes', priorityLevel:'High' ,expireAt:'30-11-2024 23:01 PM'},
    { type: 'Info', message: 'Message 1', employeeName: 'Ravi', isRead: 'No', priorityLevel:'High' ,expireAt:'23-11-2024 21:01 PM'},
    { type: 'Error', message: 'Message 2', employeeName: 'Raju', isRead: 'No', priorityLevel:'High' ,expireAt:'23-11-2024 23:01 PM'},
    { type: 'Info', message: 'Message 1', employeeName: 'Raghu', isRead: 'Yes', priorityLevel:'High' ,expireAt:'23-11-2024 23:01 PM'},
    { type: 'Warning', message: 'Message 1', employeeName: 'Rahi', isRead: 'No', priorityLevel:'High' ,expireAt:'23-11-2024 28:01 PM'},
    { type: 'Info', message: 'Technical', employeeName: 'Divya', isRead: 'Yes', priorityLevel:'High' ,expireAt:'23-11-2024 20:01 PM'},
    { type: 'Error', message: 'Message 1', employeeName: 'Pavan', isRead: 'Yes', priorityLevel:'High' ,expireAt:'23-11-2024 23:01 PM'},

    // Add more data here
  ];

  // Placeholder for add alert functionality
  addAlert() {
    console.log('Add Alert button clicked');
  }

  // Placeholder for export functionality
  exportData() {
    console.log('Exporting data as', this.selectedExportType);
  }


  onView(alert: any) {
    console.log('View Holiday:', alert);
  }

  onEdit(alert: any) {
    console.log('Edit Holiday:', alert);
  }

  onDelete(alert: any) {
    console.log('Delete Holiday:', alert);
  }

}


