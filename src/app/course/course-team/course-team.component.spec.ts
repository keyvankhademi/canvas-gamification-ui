import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeamComponent } from './course-team.component';

describe('CourseTeamComponent', () => {
  let component: CourseTeamComponent;
  let fixture: ComponentFixture<CourseTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
