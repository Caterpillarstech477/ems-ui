import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataPrivacyProtectionComponent } from './employee-data-privacy-protection.component';

describe('EmployeeDataPrivacyProtectionComponent', () => {
  let component: EmployeeDataPrivacyProtectionComponent;
  let fixture: ComponentFixture<EmployeeDataPrivacyProtectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDataPrivacyProtectionComponent]
    });
    fixture = TestBed.createComponent(EmployeeDataPrivacyProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
