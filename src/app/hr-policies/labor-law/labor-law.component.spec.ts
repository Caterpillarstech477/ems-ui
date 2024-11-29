import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborLawComponent } from './labor-law.component';

describe('LaborLawComponent', () => {
  let component: LaborLawComponent;
  let fixture: ComponentFixture<LaborLawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborLawComponent]
    });
    fixture = TestBed.createComponent(LaborLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
