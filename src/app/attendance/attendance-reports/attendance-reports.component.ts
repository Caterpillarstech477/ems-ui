import { Component, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.css']
})
export class AttendanceReportsComponent {

  employees = [
    {
      date:'2024-12-16',
      employee_name: 'Gayathri',
      role:'Design',
      status:'Present',
      check_in:'09:00 AM',
      check_out:'6.00PM',
      work_hours:'9 Hours',
      remarks:'Checkout time early'
    },
    {
      date:'2024-12-16',
      employee_name: 'Venkatesh',
      role:'Manager',
      status:'Present',
      check_in:'09:00 AM',
      check_out:'6.00PM',
      work_hours:'9 Hours',
      remarks:'Login time is late'
    }
  ];

  // Export data to an Excel file
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'ExportedData.xlsx');
  }

  // Export data to a PDF file
  
   exportToPDF(): void {
    // Convert HTML table to PDF
      const table = document.getElementById('attendanceTable');
       if (table) {
      const actionColumns = table.querySelectorAll('.no-print');
      actionColumns.forEach(column => (column as HTMLElement).style.display = 'none');
      
      // Generate PDF
      const doc = new jsPDF();

      html2canvas(table).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // A4 width
        const pageHeight = 297; // A4 height
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add the image to the PDF
        while (heightLeft > 0) {
          doc.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          if (heightLeft > 0) {
            doc.addPage();
            position = -pageHeight;
          }
        }

        doc.save('ExportedData.pdf');
         // Restore Action column
      actionColumns.forEach(column => (column as HTMLElement).style.display = '');
      });
    }
  }

// export Event handler
  onExport(event: Event): void {
    const exportType = (event.target as HTMLSelectElement).value;
    if (exportType === 'excel') {
      this.exportToExcel();
    } else if (exportType === 'pdf') {
      this.exportToPDF();
    } else if(exportType === 'print'){
      this.printPage();
    }
  }
// to Take Print
  printPage(): void {
    const printContents = document.getElementById('table-container')?.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow && printContents) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Attendence Report</title>
             <style>
             table {
              width: 100%;
              border-collapse: collapse;
              text-align: left;
            }

              th {
                   padding: 3px;    
                   border: 1px solid #ddd;
                   color: #16446c;
                  }

                td {
                 color: black;
                 border: 1px solid #ddd;
                 text-align: center;
                 vertical-align: middle;
                }

                th {
                   background-color: #f4f4f4;
                  font-weight: bold;
                  }
                  /* Hide Action column during print */
            .no-print {
              display: none !important;
            }

            </style>
          </head>
          <body onload="window.print(); window.close();">
             <table>
            ${printContents}
          </table>
          </body>
        </html>
       `);

    }
  }

  modalRef: BsModalRef | null = null;
  attendenceReportForm!: FormGroup;
  isSubmitted = false;
  isModalOpen = false;
  isViewMode = false;
  isEditMode = false;
  selectedBenefit: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };

  constructor(private modalService: BsModalService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initBenefitForm();
  }

  initBenefitForm() {
    this.attendenceReportForm = this.fb.group({
      date: ['',[Validators.required]],
      employee_name:  ['',[Validators.required]],
      role:  ['',[Validators.required]],
      status:  ['',[Validators.required]],
      check_in:  ['',[Validators.required]],
      check_out:  ['',[Validators.required]],
      work_hours: ['',[Validators.required]],
      remarks: ['',[Validators.required]],
    });
  }

  get f() {
    return this.attendenceReportForm.controls;
  }

  openCreateFormModal(template: TemplateRef<any>, type: string = '', benefit: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isModalOpen = true;
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedBenefit = benefit;

    if (benefit) {
      this.attendenceReportForm.patchValue(benefit);
    } else {
      this.attendenceReportForm.reset();
    }

    if (this.isViewMode) {
      this.attendenceReportForm.disable();
    } else {
      this.attendenceReportForm.enable();
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
    this.selectedBenefit = null;
    this.cdr.detectChanges();
  }

  addBenefit() {
    this.employees.push(this.attendenceReportForm.value);
    this.closeCreateFormModal();
  }

  updateBenefit() {
    if (this.selectedBenefit) {
      const index = this.employees.findIndex(
        b => b.employee_name === this.selectedBenefit.employee_name && b.employee_name === this.selectedBenefit.employee_name
      );
      if (index > -1) {
        this.employees[index] = this.attendenceReportForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  onDelete(benefit: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${benefit.employee_name}'s record?`);
    if (confirmDelete) {
      this.employees = this.employees.filter(b => b.employee_name !== benefit.employee_name);
    }
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    this.filterAttendanceByDate(selectedDate);
  }

  filterAttendanceByDate(date: string) {
    this.employees = this.employees.filter(employee => employee.date === date);
  }

  exportAttendanceReport(event: any) {
    const selectedFormat = event.target.value;
    if (selectedFormat === 'pdf') {
      this.exportAsPDF();
    } else if (selectedFormat === 'csv') {
      this.exportAsCSV();
    } 
  }

  exportAsPDF() {
    console.log('Exporting as PDF...');
  }

  exportAsCSV() {
    console.log('Exporting as CSV...');
  }

  

  openManualAttendance() {
    console.log('Manual Attendance button clicked!');
  }
}
