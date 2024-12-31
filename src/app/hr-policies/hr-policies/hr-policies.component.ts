import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-hr-policies',
  templateUrl: './hr-policies.component.html',
  styleUrls: ['./hr-policies.component.css']
})
export class HrPoliciesComponent {

 policies = [
    {
      policy_type: 'Policy 1',
      policy_description:'Sponser Guidance',
      related_file:'pdf',
      policy_expires_at:'23-11-2024 23:01 PM'
      
    }
  ];

  modalRef: BsModalRef | null = null;
  hrPolicyForm!: FormGroup;
  isSubmitted=false;
  isModalOpen=false;
  isViewMode = false;
  isEditMode = false;
  selectedPolicy: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initProjectForm();
  }

  // Initialize the form with form controls (no validation)
  initProjectForm() {
    this.hrPolicyForm = this.fb.group({
      policy_type:[''],
      policy_description:[''],
      related_file:[''],
      policy_expires_at:['']
    });
  }

  // Getter for form controls
  get f() {
    return this.hrPolicyForm.controls;
  }

  // Open the modal for adding, editing or viewing policies
  openCreateFormModal(template: TemplateRef<any>, type: string = '', policy: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isModalOpen = true;
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedPolicy = policy;

    if (policy) {
      this.hrPolicyForm.patchValue(policy); // Populate form with policy data
    } else {
      this.hrPolicyForm.reset();
    }

    if (this.isViewMode) {
      this.hrPolicyForm.disable(); // Disable form for view mode
    } else {
      this.hrPolicyForm.enable(); // Enable form for edit/add modes
    }
  }

  // Close the modal
  closeCreateFormModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = null;
    }
    this.isSubmitted = false;
    this.isModalOpen = false;
    this.isViewMode = false;
    this.isEditMode = false;
    this.selectedPolicy = null;
  }

  // Add a new policy
  addProject() {
    console.log('Adding policy', this.hrPolicyForm.value);
    this.policies.push(this.hrPolicyForm.value);
    console.log('Policies:', this.policies);
    this.closeCreateFormModal();
  }

  // Update an existing policy
  updateProject() {
    if (this.selectedPolicy) {
      const index = this.policies.findIndex(policy => policy === this.selectedPolicy);
      if (index > -1) {
        this.policies[index] = this.hrPolicyForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  // Delete a policy
  onDelete(policy: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${policy.policy_type}?`);
    if (confirmDelete) {
      this.policies = this.policies.filter(p => p !== policy);
    }
  }
}

