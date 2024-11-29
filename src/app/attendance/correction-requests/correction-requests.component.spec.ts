import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionRequestsComponent } from './correction-requests.component';

describe('CorrectionRequestsComponent', () => {
  let component: CorrectionRequestsComponent;
  let fixture: ComponentFixture<CorrectionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectionRequestsComponent]
    });
    fixture = TestBed.createComponent(CorrectionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
