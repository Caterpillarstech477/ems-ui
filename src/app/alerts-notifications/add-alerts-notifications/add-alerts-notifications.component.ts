import { Component } from '@angular/core';

@Component({
  selector: 'app-add-alerts-notifications',
  templateUrl: './add-alerts-notifications.component.html',
  styleUrls: ['./add-alerts-notifications.component.css']
})
export class AddAlertsNotificationsComponent {
   // Define the data structure for the alert
   alertData = {
    alertType: '',
    alertMessage: '',
    employeeName: '',
    isRead: '',
    priorityLevel: '',
    expiresAt: ''
  };
 // Define the available alert types (you can replace this with actual data if needed)
 alertTypes = ['Information', 'Warning', 'Critical','Error'];
 alertMessages = ['Message 1', 'Security', 'Technical','Message 2','Report' ];
 employeeNames = ['Purna', 'Ravi', 'Hari','Pavan','Venkat','Shalini'];
 priorityLevels = ['High', 'Critical', 'Immediate','Lowest Priority'];

 // This method is triggered when the form is submitted
 onSubmit(form: any) {
  if (form.valid) {
    console.log('Form Submitted!', this.alertData);
    // Here, you can handle the form submission, e.g., sending the data to a backend
    this.resetForm(form);
  } else {
    console.log('Form is invalid');
  }
}

// This method is triggered when "Add More" button is clicked
addMore() {
  // Optionally, add logic to allow adding more alerts or resetting fields
  this.alertData = {
    alertType: '',
    alertMessage: '',
    employeeName: '',
    isRead: '',
    priorityLevel: '',
    expiresAt: ''
  };
}

// Method to reset the form after submission
resetForm(form: any) {
  this.alertData = {
    alertType: '',
    alertMessage: '',
    employeeName: '',
    isRead: '',
    priorityLevel: '',
    expiresAt: ''
  };
  form.resetForm();
}

}
