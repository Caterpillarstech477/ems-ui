import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent {

  holidays = [
    { holiday_name: 'Christmas', date: '25-12-2024', day: 'Tuesday', type: 'Public', region: 24 },
    { holiday_name: 'New Year', date: '01-01-2024', day: 'Friday', type: 'Public', region: 16 },
    { holiday_name: 'Pongal', date: '13-03-2024', day: 'Tuesday', type: 'Public', region: 18 },
    { holiday_name: 'Sankranthi', date: '25-04-2024', day: 'Friday', type: 'Public', region: 10 },
    { holiday_name: 'Republic Day', date: '25-05-2024', day: 'Saturday', type: 'Public', region: 16 },
    { holiday_name: 'Good Friday', date: '03-06-2024', day: 'Wednesday', type: 'Public', region: 18 },
    { holiday_name: 'Labour Day', date: '01-05-2024', day: 'Tuesday', type: 'Public', region: 13 },
    { holiday_name: 'Thanks Giving Day', date: '25-11-2024', day: 'Friday', type: 'Public', region: 11 },
    { holiday_name: 'Independence Day', date: '15-08-2024', day: 'Saturday', type: 'Public', region: 8 },
    { holiday_name: 'Gandhi Jayanti', date: '02-08-2024', day: 'Sunday', type: 'Public', region: 9 },
    { holiday_name: 'Diwali', date: '10-11-2024', day: 'Tuesday', type: 'Public', region: 10 },
    { holiday_name: 'Ganesh Chaturthi', date: '09-12-2024', day: 'Monday', type: 'Public', region: 14 },
    { holiday_name: 'Company Anniversary', date: '11-03-2024', day: 'Tuesday', type: 'Public', region: 17 },
    { holiday_name: 'Festival', date: '30-12-2024', day: 'Monday', type: 'Public', region: 19 }
  ];
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

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

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
      this.addHolidayForm.reset();
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
    // if (this.addHolidayForm.valid) {
      this.holidays.push(this.addHolidayForm.value);
      console.log('this.holidays', this.holidays);
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
