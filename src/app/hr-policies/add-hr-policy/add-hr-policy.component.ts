import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-hr-policy',
  templateUrl: './add-hr-policy.component.html',
  styleUrls: ['./add-hr-policy.component.css']
})
export class AddHrPolicyComponent {
  documentForm!: FormGroup;
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.documentForm = this.fb.group({
        policy_type: ['', Validators.required],
        policy_name: ['', Validators.required],
        description: ['', Validators.required],
        expires_at: [null, Validators.required],
        uploaded_by: ['', Validators.required],
        
      });
    }
  
    onSubmit(): void {
      if (this.documentForm.valid) {
        // Handle form submission logic
        console.log('Form Submitted:', this.documentForm.value);
        
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
      this.documentForm.reset({
        documentType: 'pdf',
        status: 'active'
      });
      console.log('Form cleared for adding more entries');
    }
    
      }
  


