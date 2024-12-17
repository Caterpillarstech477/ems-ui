import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHrPolicyComponent } from './add-hr-policy.component';

describe('AddHrPolicyComponent', () => {
  let component: AddHrPolicyComponent;
  let fixture: ComponentFixture<AddHrPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHrPolicyComponent]
    });
    fixture = TestBed.createComponent(AddHrPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
