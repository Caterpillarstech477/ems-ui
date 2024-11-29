import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsAndNotificationReportComponent } from './alerts-and-notification-report.component';

describe('AlertsAndNotificationReportComponent', () => {
  let component: AlertsAndNotificationReportComponent;
  let fixture: ComponentFixture<AlertsAndNotificationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsAndNotificationReportComponent]
    });
    fixture = TestBed.createComponent(AlertsAndNotificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
