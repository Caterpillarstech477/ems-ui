import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDocumentationComponent } from './project-documentation.component';

describe('ProjectDocumentationComponent', () => {
  let component: ProjectDocumentationComponent;
  let fixture: ComponentFixture<ProjectDocumentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDocumentationComponent]
    });
    fixture = TestBed.createComponent(ProjectDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});