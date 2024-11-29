import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeBenefitsComponent } from './add-employee-benefits.component';

describe('AddEmployeeBenefitsComponent', () => {
  let component: AddEmployeeBenefitsComponent;
  let fixture: ComponentFixture<AddEmployeeBenefitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmployeeBenefitsComponent]
    });
    fixture = TestBed.createComponent(AddEmployeeBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
