import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestsReportComponent } from './leave-requests-report.component';

describe('LeaveRequestsReportComponent', () => {
  let component: LeaveRequestsReportComponent;
  let fixture: ComponentFixture<LeaveRequestsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestsReportComponent]
    });
    fixture = TestBed.createComponent(LeaveRequestsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
