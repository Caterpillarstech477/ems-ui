import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssignmentComponent } from './project-assignment.component';

describe('ProjectAssignmentComponent', () => {
  let component: ProjectAssignmentComponent;
  let fixture: ComponentFixture<ProjectAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectAssignmentComponent]
    });
    fixture = TestBed.createComponent(ProjectAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
