import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-report-document',
  templateUrl: './project-report-document.component.html',
  styleUrls: ['./project-report-document.component.css']
})
export class ProjectReportDocumentComponent {

 documentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.documentForm = this.fb.group({
      projectName: ['', Validators.required],
      documentName: ['', Validators.required],
      documentType: ['', Validators.required],
      uploadFile: [null, Validators.required],
      uploadedBy: ['', Validators.required],
      uploadedDate: ['', Validators.required],
      documentVersion: ['', Validators.required],
      status: ['active', Validators.required]
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
  
  // Optional: If you need to save the form data (e.g., API call)
  // saveData(formData: any): void {
  //   // Your save logic here (API call, local storage, etc.)
  // }
}

