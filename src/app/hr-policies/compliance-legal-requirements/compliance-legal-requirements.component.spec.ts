import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceLegalRequirementsComponent } from './compliance-legal-requirements.component';

describe('ComplianceLegalRequirementsComponent', () => {
  let component: ComplianceLegalRequirementsComponent;
  let fixture: ComponentFixture<ComplianceLegalRequirementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplianceLegalRequirementsComponent]
    });
    fixture = TestBed.createComponent(ComplianceLegalRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
