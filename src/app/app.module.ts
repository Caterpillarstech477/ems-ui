import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEmployeeComponent } from './employee-management/add-employee/add-employee.component';
import { EmployeeBenefitReportsComponent } from './employee-management/employee-benefit-reports/employee-benefit-reports.component';
import { AddEmployeeBenefitsComponent } from './employee-management/add-employee-benefits/add-employee-benefits.component';
import { IntegrateComponent } from './integrate/integrate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AttendanceReportsComponent } from './attendance/attendance-reports/attendance-reports.component';
import { CorrectionRequestsComponent } from './attendance/correction-requests/correction-requests.component';
import { LeaveRequestsReportComponent } from './leave-management/leave-requests-report/leave-requests-report.component';
import { LeaveBalanceManagementComponent } from './leave-management/leave-balance-management/leave-balance-management.component';
import { HolidayListComponent } from './leave-management/holiday-list/holiday-list.component';
import { ComplianceLegalRequirementsComponent } from './hr-policies/compliance-legal-requirements/compliance-legal-requirements.component';
import { LaborLawComponent } from './hr-policies/labor-law/labor-law.component';
import { HealthSafetyComponent } from './hr-policies/health-safety/health-safety.component';
import { ContractAgreementComponent } from './hr-policies/contract-agreement/contract-agreement.component';
import { EmployeeDataPrivacyProtectionComponent } from './hr-policies/employee-data-privacy-protection/employee-data-privacy-protection.component';
import { ProjectReportComponent } from './projects/project-report/project-report.component';
import { ProjectAssignmentComponent } from './projects/project-assignment/project-assignment.component';
import { ProjectDocumentationComponent } from './projects/project-documentation/project-documentation.component';
import { ProjectBudgetComponent } from './projects/project-budget/project-budget.component';
import { AssetReportComponent } from './asset-management/asset-report/asset-report.component';
import { AssetAssignmentComponent } from './asset-management/asset-assignment/asset-assignment.component';
import { AlertsAndNotificationReportComponent } from './alerts-notifications/alerts-and-notification-report/alerts-and-notification-report.component';
import { AddAlertsNotificationsComponent } from './alerts-notifications/add-alerts-notifications/add-alerts-notifications.component';
import { AddAssetComponent } from './asset-management/add-asset/add-asset.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';  // Import ModalModule
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeProfileManagementComponent } from './employee-management/employee-profile-management/employee-profile-management.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AddEmployeeComponent,
    EmployeeBenefitReportsComponent,
    AddEmployeeBenefitsComponent,
    IntegrateComponent,
    AttendanceReportsComponent,
    CorrectionRequestsComponent,
    LeaveRequestsReportComponent,
    LeaveBalanceManagementComponent,
    HolidayListComponent,
    ComplianceLegalRequirementsComponent,
    LaborLawComponent,
    HealthSafetyComponent,
    ContractAgreementComponent,
    EmployeeDataPrivacyProtectionComponent,
    ProjectReportComponent,
    ProjectAssignmentComponent,
    ProjectDocumentationComponent,
    ProjectBudgetComponent,
    AssetReportComponent,
    AssetAssignmentComponent,
    AlertsAndNotificationReportComponent,
    AddAlertsNotificationsComponent,
    AddAssetComponent,
    EmployeeProfileManagementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),  
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
