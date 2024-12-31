import { Component,TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-leave-requests-report',
  templateUrl: './leave-requests-report.component.html',
  styleUrls: ['./leave-requests-report.component.css']
})
export class LeaveRequestsReportComponent {
  
  employees = [
     {
       employee_name:'Gayathri',
       employee_id: '121',
       department:'Design',
       role:'Developer',
       leave_type:'Casual',
       status:'Approved'
       
     },
     {
      employee_name:'Kushal',
      employee_id: '121',
      department:'Design',
      role:'Intern',
      leave_type:'Casual',
      status:'Pending'
      
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
      const table = document.getElementById('leaveTable');
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
            <title>Leave Request Report</title>
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
   leaverequestform!: FormGroup;
   isSubmitted=false;
   isModalOpen=false;
   isViewMode = false;
   isEditMode = false;
   selectedEmployee: any = null;
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
     this.leaverequestform = this.fb.group({
      employee_name:[''],
       employee_id: [''],
       department:[''],
       role:[''],
       leave_type:[''],
       status:[''],
     });
   }
 
   get f() {
     return this.leaverequestform.controls;
   }
 
   openCreateFormModal(template: TemplateRef<any>, type: string = '', employee: any = null) {
     this.modalRef = this.modalService.show(template, this.config);
     this.isModalOpen = true;
     this.isViewMode = type === 'view';
     this.isEditMode = type === 'edit';
     this.selectedEmployee = employee;
 
     if (employee) {
       this.leaverequestform.patchValue(employee);
     } else {
       this.leaverequestform.reset();
     }
 
     if (this.isViewMode) {
       this.leaverequestform.disable();
     } else {
       this.leaverequestform.enable();
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
     this.selectedEmployee = null;
     this.cdr.detectChanges();
   }
 
   addLeaveRequest() {
     this.employees.push(this.leaverequestform.value);
     this.closeCreateFormModal();
   }
 
   updateLeaveRequest() {
     if (this.selectedEmployee) {
       const index = this.employees.findIndex(
         b => b.employee_name === this.selectedEmployee.employee_name && b.employee_name === this.selectedEmployee.employee_name
       );
       if (index > -1) {
         this.employees[index] = this.leaverequestform.value;
         this.closeCreateFormModal();
       }
     }
   }
 
   onDelete(employee: any) {
     const confirmDelete = confirm(`Are you sure you want to delete ${employee.employee_name}'s record?`);
     if (confirmDelete) {
       this.employees = this.employees.filter(b => b.employee_name !== employee.employee_name);
     }
   }
 
   
 
  //  exportAttendanceReport(event: any) {
  //    const selectedFormat = event.target.value;
  //    if (selectedFormat === 'pdf') {
  //      this.exportAsPDF();
  //    } else if (selectedFormat === 'csv') {
  //      this.exportAsCSV();
  //    } 
  //  }
 
  //  exportAsPDF() {
  //    console.log('Exporting as PDF...');
  //  }
 
  //  exportAsCSV() {
  //    console.log('Exporting as CSV...');
  //  }
 
   
 
   
 }
 