import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent {
  projects = [
    {
      projectName: 'Project 1',
      description: 'Description 1',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'ongoing',
      assignedTeam: 'Team A',
      assignedTo: 'John',
      role: 'developer'
    }
  ];

  modalRef: BsModalRef | null = null;
  projectForm!: FormGroup;
  isSubmitted=false;
  isModalOpen=false;
  isViewMode = false;
  isEditMode = false;
  selectedProject: any = null;
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
    this.projectForm = this.fb.group({
      projectName: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      assignedTeam: [''],
      assignedTo: [''],
      role: ['']
    });
  }

  // Getter for form controls
  get f() {
    return this.projectForm.controls;
  }

  // Open the modal for adding, editing or viewing projects
  openCreateFormModal(template: TemplateRef<any>, type: string = '', project: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isModalOpen = true;
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedProject = project;

    if (project) {
      this.projectForm.patchValue(project); // Populate form with project data
    } else {
      this.projectForm.reset();
    }

    if (this.isViewMode) {
      this.projectForm.disable(); // Disable form for view mode
    } else {
      this.projectForm.enable(); // Enable form for edit/add modes
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
    this.selectedProject = null;
  }

  // Add a new project
  addProject() {
    console.log('Adding project', this.projectForm.value);
    this.projects.push(this.projectForm.value);
    console.log('Projects:', this.projects);
    this.closeCreateFormModal();
  }

  // Update an existing project
  updateProject() {
    if (this.selectedProject) {
      const index = this.projects.findIndex(project => project === this.selectedProject);
      if (index > -1) {
        this.projects[index] = this.projectForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  // Delete a project
  onDelete(project: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${project.projectName}?`);
    if (confirmDelete) {
      this.projects = this.projects.filter(p => p !== project);
    }
  }
}
