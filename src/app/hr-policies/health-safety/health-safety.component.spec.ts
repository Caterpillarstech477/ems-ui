import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthSafetyComponent } from './health-safety.component';

describe('HealthSafetyComponent', () => {
  let component: HealthSafetyComponent;
  let fixture: ComponentFixture<HealthSafetyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthSafetyComponent]
    });
    fixture = TestBed.createComponent(HealthSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
