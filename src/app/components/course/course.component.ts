import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course.service';
import {Course, CourseRegistration, User} from '@app/_models';
import {ActivatedRoute} from '@angular/router';
import {CourseRegistrationService} from '@app/_services/api/course-registration.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course: Course;
  courseReg: CourseRegistration;
  courseId: number;
  user: User;

  constructor(private authenticationService: AuthenticationService,
              private courseService: CourseService,
              private courseRegistrationService: CourseRegistrationService,
              private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.params.courseId;
    this.authenticationService.currentUser.subscribe(user => this.user = user);

  }

  ngOnInit(): void {
    forkJoin([
      this.courseService.getCourse(this.courseId, true, {ordering: {name: true}}),
      this.courseRegistrationService.getCourseRegistrations({filters: {course: this.courseId}})
    ])?.subscribe(([course, courseRegs]) => {
      this.course = course;
      this.courseReg = courseRegs[0];
      console.log(course)
    });

  }

  isTeacher() {
    return true;
    // TODO: MERGE THIS BRANCH with increased auth service and change this function to the following:
    // return this.user.is_teacher;
    
  }

}