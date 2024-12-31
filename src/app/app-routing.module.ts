import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//employee management
import { EmployeeProfileManagementComponent } from './employee-management/employee-profile-management/employee-profile-management.component';
import { AddEmployeeComponent } from './employee-management/add-employee/add-employee.component';
import { EmployeeBenefitReportsComponent } from './employee-management/employee-benefit-reports/employee-benefit-reports.component';
import { AddEmployeeBenefitsComponent } from './employee-management/add-employee-benefits/add-employee-benefits.component';
//import { IntegrateComponent } from './integrate/integrate.component';
//attendence
import { AttendanceReportsComponent } from './attendance/attendance-reports/attendance-reports.component';
import { CorrectionRequestsComponent } from './attendance/correction-requests/correction-requests.component';
// Leave Management
import { LeaveRequestsReportComponent } from './leave-management/leave-requests-report/leave-requests-report.component';
import { LeaveBalanceManagementComponent } from './leave-management/leave-balance-management/leave-balance-management.component';
import { HolidayListComponent } from './leave-management/holiday-list/holiday-list.component';
// HR Policies
import { ComplianceLegalRequirementsComponent } from './hr-policies/compliance-legal-requirements/compliance-legal-requirements.component';
import { LaborLawComponent } from './hr-policies/labor-law/labor-law.component';
import { HealthSafetyComponent } from './hr-policies/health-safety/health-safety.component';
import { ContractAgreementComponent } from './hr-policies/contract-agreement/contract-agreement.component';
import { EmployeeDataPrivacyProtectionComponent } from './hr-policies/employee-data-privacy-protection/employee-data-privacy-protection.component';
import { HrPoliciesComponent } from './hr-policies/hr-policies/hr-policies.component';
import { AddHrPolicyComponent } from './hr-policies/add-hr-policy/add-hr-policy.component';
//projects;
import { ProjectReportComponent } from './projects/project-report/project-report.component';
import { ProjectAssignmentComponent } from './projects/project-assignment/project-assignment.component';
import { ProjectDocumentationComponent } from './projects/project-documentation/project-documentation.component';
import { ProjectBudgetComponent } from './projects/project-budget/project-budget.component';
import { ProjectReportDocumentComponent } from './projects/project-report-document/project-report-document.component';
// Asset Management
import { AssetReportComponent } from './asset-management/asset-report/asset-report.component';
import { AssetAssignmentComponent } from './asset-management/asset-assignment/asset-assignment.component';
import { AddAssetComponent } from './asset-management/add-asset/add-asset.component';
//alerts and notifications
import { AddAlertsNotificationsComponent } from './alerts-notifications/add-alerts-notifications/add-alerts-notifications.component';
import { AlertsAndNotificationReportComponent } from './alerts-notifications/alerts-and-notification-report/alerts-and-notification-report.component';
//login
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // Default route (Login page)
  { path: '', component: LoginComponent },

  // Employee Management routes
  { path: 'employee-profile-management', component: EmployeeProfileManagementComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employee-benefit-reports', component: EmployeeBenefitReportsComponent },
  
  // Attendance routes
  { path: 'add-employee-benefits', component: AddEmployeeBenefitsComponent },
  { path: 'attendance-reports', component: AttendanceReportsComponent },
  { path: 'correction-requests', component: CorrectionRequestsComponent },

  // Leave Management routes
  { path: 'leave-requests-report', component: LeaveRequestsReportComponent },
  { path: 'leave-balance-management', component: LeaveBalanceManagementComponent },
  { path: 'holiday-list', component: HolidayListComponent },

  // HR Policies routes
  { path: 'compliance-legal-requirements', component: ComplianceLegalRequirementsComponent },
  { path: 'labor-law', component: LaborLawComponent },
  { path: 'health-safety', component: HealthSafetyComponent },
  { path: 'contract-agreement', component: ContractAgreementComponent },
  { path: 'employee-data-privacy-protection', component: EmployeeDataPrivacyProtectionComponent },
  {path:  'hr-policies.component',component:HrPoliciesComponent},
  {path:  'add-hr-policy',component:AddHrPolicyComponent },

  // Projects routes
  { path: 'project-report', component: ProjectReportComponent },
  { path: 'project-assignment', component: ProjectAssignmentComponent },
  { path: 'project-documentation', component: ProjectDocumentationComponent },
  { path: 'project-budget', component: ProjectBudgetComponent },
  {path: 'project-report-document',component:ProjectReportDocumentComponent},

  // Asset Management routes
  { path: 'asset-report', component: AssetReportComponent },
  { path: 'asset-assignment', component: AssetAssignmentComponent },
  { path: 'add-asset', component: AddAssetComponent },

  // Alerts and Notifications routes
  { path: 'add-alerts-notifications', component: AddAlertsNotificationsComponent },
  { path: 'alerts-and-notification-report', component: AlertsAndNotificationReportComponent },

  // Wildcard route (in case of incorrect paths)
  { path: '**', redirectTo: '' } // Default route to login page
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
