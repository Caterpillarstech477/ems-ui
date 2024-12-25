import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Holiday } from './model/Holiday.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent {
   private HOLIDAY_REST_API_BASE_URL = 'http://localhost:8080/api/holidays';  // URL to REST api
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
    this.fetchAllHolidays();
  }

  initHolidayForm() {
    this.addHolidayForm = this.fb.group({ 
      holiday_name: ['', [Validators.required]],
      holiday_type: ['', [Validators.required]],
      holiday_date: ['', [Validators.required]],
      region: ['', [Validators.required]],
      description: ['', [Validators.required]],
      is_recurring: ['', []],
      
      
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
        console.log('Form +Submitted and converted into holiday object', holiday);
    
        this.http
        .post<Holiday>(this.HOLIDAY_REST_API_BASE_URL+"/add", holiday)
        .subscribe(response => {
             console.log('holiday saved successfully', response);
             this.holidays.push(response);
        });

        this.holidays.push(holiday);
          //console.log('this.employees', this.employees);
          this.closeCreateFormModal();
        // }
  }


  updateHoliday() {
      console.log(this.selectedHoliday);

       if (this.addHolidayForm.valid && this.selectedHoliday) {
        const updatedHoliday: Holiday = {
          ...this.selectedHoliday,
          ...this.addHolidayForm.value
        };
    
        this.http
          .put<Holiday>(this.HOLIDAY_REST_API_BASE_URL+"/update", updatedHoliday) // Send the updated employee object
          .subscribe(
            response => {
              const index = this.holidays.findIndex(holiday => holiday.id === updatedHoliday.id);
    
              if (index > -1) {
                this.holidays[index] = response;
              } else {
                console.error('holiday not found in local array');
              }
            console.log("updated",updatedHoliday)
    
              this.closeCreateFormModal();
            },
            error => {
              console.error('Error updating holiday:', error);
            }
          );
      } else {
        console.error('Form is invalid or selectedHoliday is missing');
      }
    
  }

  onDelete(holiday: Holiday) {
    console.log("deleting holiday : " , holiday);
    const confirmDelete = confirm(`Are you sure want to remove ${holiday.holiday_name} from holiday list?`);
    if (confirmDelete) {
      
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: holiday,
      };

      this.http.delete<Holiday>(this.HOLIDAY_REST_API_BASE_URL+"/delete", options).subscribe(
        data => {
          console.log("after deleting the holiday, response from backend : " , data);
          this.holidays = this.holidays.filter(hol => hol.holiday_name !== data.holiday_name);
        }
      )
      
    }
  }

  fetchAllHolidays() {
    this.http
        .get<Holiday[]>(this.HOLIDAY_REST_API_BASE_URL+"/fetchAll")
        .subscribe(
          data => {
            this.holidays = data;
            console.log('Holidays loaded successfully', this.holidays);
          },
          error => {
            console.error('Error loading holidays', error);
            // alert('Failed to load employees. Please try again later.');
          }
        );

    this.holidays 
  }
}
