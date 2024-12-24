import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportDocumentComponent } from './project-report-document.component';

describe('ProjectReportDocumentComponent', () => {
  let component: ProjectReportDocumentComponent;
  let fixture: ComponentFixture<ProjectReportDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectReportDocumentComponent]
    });
    fixture = TestBed.createComponent(ProjectReportDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
