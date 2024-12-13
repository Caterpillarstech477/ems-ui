import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileManagementComponent } from './employee-profile-management.component';

describe('EmployeeProfileManagementComponent', () => {
  let component: EmployeeProfileManagementComponent;
  let fixture: ComponentFixture<EmployeeProfileManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeProfileManagementComponent]
    });
    fixture = TestBed.createComponent(EmployeeProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
