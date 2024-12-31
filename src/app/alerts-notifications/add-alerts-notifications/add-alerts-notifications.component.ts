import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-alerts-notifications',
  templateUrl: './add-alerts-notifications.component.html',
  styleUrls: ['./add-alerts-notifications.component.css']
})
export class AddAlertsNotificationsComponent {

  // Data for dropdowns
  alertTypes = ['Info', 'Warning', 'Error', 'Critical'];
  alertMessages = ['1', '2','3','4'];
  priorityLevels = ['High', 'Lowest', 'Critical'];

  addAlertForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.addAlertForm = this.fb.group({
        alertType: ['', Validators.required],
        alertMessage: ['', Validators.required],
        employeeName: ['', Validators.required],
        isRead: ['', Validators.required],
        priorityLevel: ['', Validators.required],
        expiresAt: ['', Validators.required],
        
      });
    }

    onSubmit(): void {
      if (this.addAlertForm.valid) {
        // Handle form submission logic
        console.log('Form Submitted:', this.addAlertForm.value);

        // Logic for saving the data (e.g., API call or local storage)
        // this.saveData(this.documentForm.value);
      } else {
        console.log('Form is invalid');
      }
    }
  
    exitForm(): void {
      // Logic for exiting the form, e.g., navigating away or closing the modal
      console.log('Form Exited');
    }
  
    addMore(): void {
      // Reset the form to clear all fields for a new entry
      this.addAlertForm.reset({
        documentType: 'pdf',
        status: 'active'
      });
      console.log('Form cleared for adding more entries');
    }
}
