import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlertsNotificationsComponent } from './add-alerts-notifications.component';

describe('AddAlertsNotificationsComponent', () => {
  let component: AddAlertsNotificationsComponent;
  let fixture: ComponentFixture<AddAlertsNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAlertsNotificationsComponent]
    });
    fixture = TestBed.createComponent(AddAlertsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
