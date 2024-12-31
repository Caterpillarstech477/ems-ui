import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asset-report',
  templateUrl: './asset-report.component.html',
  styleUrls: ['./asset-report.component.css']
})
export class AssetReportComponent {
  assets = [
    {
      assetName: 'Computer',
      assetType: 'IT Equipment',
      purchasedDate: '2024-12-01',
      assetValue: '£1000',
      assignedTo: 'Pavan',
      location: 'Hyd',
      warrantyPeriod: '1 Year',
      assetCondition: 'New',
      status: 'Active',
      purchaseInvoice: '1300$'
    }
  ];

  modalRef: BsModalRef | null = null;
  assetForm!: FormGroup;
  isSubmitted=false;
  isModalOpen=false;
  isViewMode = false;
  isEditMode = false;
  selectedAsset: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };

  constructor(private modalService: BsModalService, private fb: FormBuilder,) {}

  ngOnInit() {
    this.initAssetForm();
  }

  // Initialize the form with form controls (no validation)
  initAssetForm() {
    this.assetForm = this.fb.group({
    assetName: [''],
    assetType: [''],
    purchasedDate: [''],
    assetValue: [''],
    assignedTo: [''],
    location: [''],
    warrantyPeriod: [''],
    assetCondition: [''],
    status: [''],
    purchaseInvoice: ['']
    });
  }

  // Getter for form controls
  get f() {
    return this.assetForm.controls;
  }

  // Open the modal for adding, editing or viewing assets
  openCreateFormModal(template: TemplateRef<any>, type: string = '', asset: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isModalOpen = true;
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedAsset = asset;

    if (asset) {
      this.assetForm.patchValue(asset); // Populate form with asset data
    } else {
      this.assetForm.reset();
    }

    if (this.isViewMode) {
      this.assetForm.disable(); // Disable form for view mode
    } else {
      this.assetForm.enable(); // Enable form for edit/add modes
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
    this.selectedAsset = null;
  }

  // Add a new asset
  addAsset() {
    console.log('Adding asset', this.assetForm.value);
    this.assets.push(this.assetForm.value);
    console.log("this.assets",this.assets)
    this.closeCreateFormModal();
  }

  // Update an existing asset
  updateAsset() {
    if (this.selectedAsset) {
      const index = this.assets.findIndex(asset => asset === this.selectedAsset);
      if (index > -1) {
        this.assets[index] = this.assetForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  // Delete an asset
  onDelete(asset: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${asset.assetName}?`);
    if (confirmDelete) {
      this.assets = this.assets.filter(a => a !== asset);
    }
  }
}
