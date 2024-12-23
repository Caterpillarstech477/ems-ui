import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Holiday } from './model/Holiday.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent {
   private HOLIDAY_REST_API_URL = 'http://localhost:8080/api/holidays';  // URL to REST api
    holidays: Holiday[] = []; // Array of holiday objects
  
  modalRef: BsModalRef | null = null;
  addHolidayForm: FormGroup = this.fb.group({});
  isSubmitted = false;
  isModalOpen = false;
  isViewMode = false;
  isEditMode = false;
  selectedHoliday: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };

  constructor(private modalService: BsModalService, private fb: FormBuilder,private http: HttpClient) {}

  ngOnInit() {
    this.initHolidayForm();
  }

  initHolidayForm() {
    this.addHolidayForm = this.fb.group({ 
      holiday_name: ['', [Validators.required]],
      holiday_type: ['', [Validators.required]],
      holiday_date: ['', [Validators.required]],
      region: ['', [Validators.required]],
      description: ['', [Validators.required]],
      is_recurring: ['', [Validators.required]],
      
      
    });
  }

  get f() {
    return this.addHolidayForm.controls;
  }

  openCreateFormModal(template: TemplateRef<any>, type: string = '', holiday: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isModalOpen = true;
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedHoliday = holiday;

    if (holiday) {
      this.addHolidayForm.patchValue(holiday); // Populate form with holiday data
    } else {
      this.addHolidayForm.reset
      
      ();
    }

    if (this.isViewMode) {
      this.addHolidayForm.disable(); // Disable form for view mode
    } else {
      this.addHolidayForm.enable(); // Enable form for edit/add modes
    }
  }

  closeCreateFormModal() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = null;
    }
    this.isSubmitted = false;
    this.isModalOpen = false;
    this.isViewMode = false;
    this.isEditMode = false;
    this.selectedHoliday = null;
  }

  addHoliday() {
    console.log('calling addHoliday', this.addHolidayForm.value);
    
        const holiday: Holiday = this.addHolidayForm.value as Holiday;
        console.log('Form +Submitted and converted into employee object', holiday);
    
        // this.http
        // .post<Holiday>(this.HOLIDAY_REST_API_URL, holiday)
        // .subscribe(response => {
        //      console.log('holiday saved successfully', response);
        //      this.holidays.push(response);
        // });

        this.holidays.push(holiday);
          //console.log('this.employees', this.employees);
          this.closeCreateFormModal();
        // }
  }


  updateHoliday() {
    if (this.addHolidayForm.valid && this.selectedHoliday) {
      const index = this.holidays.findIndex(hol => hol === this.selectedHoliday);
      if (index > -1) {
        this.holidays[index] = this.addHolidayForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  onDelete(holiday: any) {
    const confirmDelete = confirm(`Are you sure want to remove ${holiday.holiday_name} from holiday list?`);
    if (confirmDelete) {
      this.holidays = this.holidays.filter(hol => hol !== holiday);
    }
  }
}
