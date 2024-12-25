import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-employee-benefit-reports',
  templateUrl: './employee-benefit-reports.component.html',
  styleUrls: ['./employee-benefit-reports.component.css']
})
export class EmployeeBenefitReportsComponent {
  benefits = [
    {
      employee_name: 'Gayathri',
      benefit_name: 'Insurance',
      benefit_description: 'Health Insurance',
      benfit_start_and_end_date: '2024-12-01 - 2024-12-12'
      
    },
    {
      employee_name: 'Vasundhara',
      benefit_name: 'Insurance',
      benefit_description: 'Health Insurance',
      benfit_start_and_end_date: '2024-12-01 - 2024-12-12'
      
    }
  ];
 
  modalRef: BsModalRef | null = null;
  benefitForm!: FormGroup;
  isViewMode = false;
  isEditMode = false;
  selectedBenefit: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };
  searchTerm: string = '';
  filteredBenefits = [...this.benefits];
  isModalOpen = false;

  filterTable() {
    this.filteredBenefits = this.benefits.filter(benefit =>
      benefit.employee_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor(private modalService: BsModalService, private fb: FormBuilder,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initBenefitForm();
  }

  // Initialize the form with form controls (no validation)
  initBenefitForm() {
    this.benefitForm = this.fb.group({
      employee_name: [],
      benefit_name: [],
      benefit_description:[],
      benfit_start_and_end_date:[]
    });
  }

  // Getter for form controls
  get f() {
    return this.benefitForm.controls;
  }

  // Open the modal for adding, editing or viewing benefits
  openCreateFormModal(template: TemplateRef<any>, type: string = '', benefit: any = null) {
    this.isModalOpen = true;
    this.modalRef = this.modalService.show(template, this.config);
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedBenefit = benefit;

    if (benefit) {
      this.benefitForm.patchValue(benefit); // Populate form with benefit data
    } else {
      this.benefitForm.reset();
    }

    if (this.isViewMode) {
      this.benefitForm.disable(); // Disable form for view mode
    } else {
      this.benefitForm.enable(); // Enable form for edit/add modes
    }
  }

  // Close the modal
  closeCreateFormModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = null;
    }
    this.isModalOpen = false;
    this.isViewMode = false;
    this.isEditMode = false;
    this.selectedBenefit = null;
    //this.benefitForm.reset();
    console.log('Modal closed, resetting state:', {
      isViewMode: this.isViewMode,
      isEditMode: this.isEditMode,
      isModalOpen: this.isModalOpen,
    });
    
    this.cdr.detectChanges();
  }

  // Add a new benefit
  addBenefit() {
    console.log('Adding benefit', this.benefitForm.value);
    this.benefits.push(this.benefitForm.value);
    console.log("this.benefits",this.benefits)
    this.closeCreateFormModal();
  }

  // Update an existing benefit
  updateBenefit() {
    if (this.selectedBenefit) {
      const index = this.benefits.findIndex(
        b => b.employee_name === this.selectedBenefit.employee_name && b.benefit_name === this.selectedBenefit.benefit_name
      );
      if (index > -1) {
        this.benefits[index] = this.benefitForm.value; // Update the benefit in the array
        this.filteredBenefits = [...this.benefits]; // Refresh the filtered benefits
        this.closeCreateFormModal();
      }
    }
  }

  // Delete an benefit
  onDelete(benefit: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${benefit.benefit_name}?`);
  if (confirmDelete) {
    // Filter the benefits by excluding the selected benefit
    this.benefits = this.benefits.filter(b => b.employee_name !== benefit.employee_name || b.benefit_name !== benefit.benefit_name);
    this.filteredBenefits = [...this.benefits]; // Update the filtered benefits list
  }
  }
}
