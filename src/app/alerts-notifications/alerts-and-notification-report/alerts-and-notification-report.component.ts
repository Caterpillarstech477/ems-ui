import { Component,TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-alerts-and-notification-report',
  templateUrl: './alerts-and-notification-report.component.html',
  styleUrls: ['./alerts-and-notification-report.component.css']
  
})
export class AlertsAndNotificationReportComponent {
  startDate: string | null = null; // Stores the selected start date
  endDate: string | null = null;   // Stores the selected end date

  // Data for dropdowns
  alertTypes = ['Info', 'Warning', 'Error', 'Critical'];
  priorityLevels = ['High', 'Lowest', 'Critical'];
  alertMessages = ['1', '2','3','4'];
  

  // Selected values
  selectedAlertType = '';
  selectedExportType = '';
  
  // Table data
  alerts = [
    { alertType: 'Info', alertMessage: 'Message 1', employeeName: 'Ravi', isRead: 'No', priorityLevel:'High' ,expireAt:'23-11-2024 23:01 PM'},
    { alertType: 'Warning', alertMessage: 'Message 2', employeeName: 'Hari', isRead: 'Yes', priorityLevel:'Critical' ,expireAt:'23-11-2024 22:01 PM'},
    { alertType: 'Error',alertMessage: 'Technical', employeeName: 'Purna', isRead: 'No', priorityLevel:'Lowest Priority' ,expireAt:'24-11-2024 23:30 PM'},
    { alertType: 'Info', alertMessage: 'Message 1', employeeName: 'Venkat', isRead: 'Yes', priorityLevel:'High' ,expireAt:'11-11-2024 23:01 PM'},
    { alertType: 'Error', alertMessage: 'Reports', employeeName: 'John', isRead: 'No', priorityLevel:'Critical' ,expireAt:'27-11-2024 23:01 PM'},
    { alertType: 'Warning', alertMessage: 'Report', employeeName: 'Rishi', isRead: 'Yes', priorityLevel:'High' ,expireAt:'30-11-2024 23:01 PM'},
    {alertType: 'Info', alertMessage: 'Message 1', employeeName: 'Ravi', isRead: 'No', priorityLevel:'High' ,expireAt:'23-11-2024 21:01 PM'},
    { alertType: 'Error', alertMessage: 'Message 2', employeeName: 'Raju', isRead: 'No', priorityLevel:'High' ,expireAt:'23-11-2024 23:01 PM'},
    { alertType: 'Info', alertMessage: 'Message 1', employeeName: 'Raghu', isRead: 'Yes', priorityLevel:'High' ,expireAt:'23-11-2024 23:01 PM'},
    // Add more data here
  ];

  
  // Export data to an Excel file
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.alerts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'ExportedData.xlsx');
  }

  // Export data to a PDF file
  
   exportToPDF(): void {
    // Convert HTML table to PDF
      const table = document.getElementById('alertTable');
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
            <title>Alerts & Notification Report</title>
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
  addAlertForm: FormGroup= this.fb.group({});
  isSubmitted = false;
  isModalOpen = false;
  isViewMode = false;
  isEditMode = false;
  selectedAlert: any = null;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md'
  };

  constructor(private modalService: BsModalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initaddAlertForm();
  }

  // Initialize the form with form controls (no validation)
  initaddAlertForm() {
    this.addAlertForm = this.fb.group({
      alertType:[''],
      alertMessage:[''],
      employeeName:[''],
      isRead:[''],
      priorityLevel:[''],
      expiresAt:[''],
    });
  }

  // Getter for form controls
  get f() {
    return this.addAlertForm.controls;
  }

  // Open the modal for adding, editing or viewing policies
  openCreateFormModal(template: TemplateRef<any>, type: string = '', alert: any = null) {
    this.modalRef = this.modalService.show(template, this.config);
    this.isModalOpen = true;
    this.isViewMode = type === 'view';
    this.isEditMode = type === 'edit';
    this.selectedAlert = alert;

    if (alert) {
      this.addAlertForm.patchValue(alert); // Populate form with policy data
    } else {
      this.addAlertForm.reset();
    }

    if (this.isViewMode) {
      this.addAlertForm.disable(); // Disable form for view mode
    } else {
      this.addAlertForm.enable(); // Enable form for edit/add modes
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
    this.selectedAlert = null;
  }

  // Add a new policy
  addAlert() {
    console.log('Add Alert', this.addAlertForm.value);
    this.alerts.push(this.addAlertForm.value);
    console.log('Alerts:', this.alerts);
    this.closeCreateFormModal();
  }

  // Update an existing policy
  updateAlert() {
    if (this.addAlertForm.valid && this.selectedAlert) {
      const index = this.alerts.findIndex(alert => alert === this.selectedAlert);
      if (index > -1) {
        this.alerts[index] = this.addAlertForm.value;
        this.closeCreateFormModal();
      }
    }
  }

  // Delete a policy
  onDelete(alert: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${alert.type}?`);
    if (confirmDelete) {
      this.alerts = this.alerts.filter(alert => alert !== alert);
    }
  }

}


