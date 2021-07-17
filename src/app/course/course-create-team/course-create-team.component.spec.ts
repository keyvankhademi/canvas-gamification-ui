import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateTeamComponent } from './course-create-team.component';

describe('CourseCreateTeamComponent', () => {
  let component: CourseCreateTeamComponent;
  let fixture: ComponentFixture<CourseCreateTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCreateTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
