import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBenefitReportsComponent } from './employee-benefit-reports.component';

describe('EmployeeBenefitReportsComponent', () => {
  let component: EmployeeBenefitReportsComponent;
  let fixture: ComponentFixture<EmployeeBenefitReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeBenefitReportsComponent]
    });
    fixture = TestBed.createComponent(EmployeeBenefitReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
