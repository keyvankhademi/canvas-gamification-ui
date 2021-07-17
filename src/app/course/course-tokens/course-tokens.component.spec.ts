import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTokensComponent } from './course-tokens.component';

describe('CourseTokensComponent', () => {
  let component: CourseTokensComponent;
  let fixture: ComponentFixture<CourseTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
