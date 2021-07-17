import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, Question, UQJ, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {ActivatedRoute, Router} from '@angular/router';
import {UqjService} from '@app/problems/_services/uqj.service';
import {forkJoin} from 'rxjs';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {CourseService} from '@app/course/_services/course.service';

@Component({
  selector: 'app-course-questions',
  templateUrl: './course-questions.component.html',
  styleUrls: ['./course-questions.component.scss']
})
export class CourseQuestionsComponent implements OnInit {
  @Input() questions: Question[];
  @Input() uqjs: UQJ[];
  user: User;
  event: CourseEvent;
  eventId: number;
  courseId: number;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private uqjService: UqjService,
              private courseEventService: CourseEventService,
              private courseService: CourseService) {
      this.authenticationService.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
      this.courseId = +this.route.snapshot.paramMap.get('courseId') || null;
      this.eventId = +this.route.snapshot.paramMap.get('eventId') || null;
      if (this.eventId && this.courseId) { // if this snippet is an event-view
          this.courseService.validateEvent(this.courseId, this.eventId).subscribe(response => {
              if (response.success) {
                  forkJoin({
                      event: this.courseEventService.getCourseEvent(this.eventId),
                      uqjs: this.uqjService.getUQJs({filters: {question_event: this.eventId}}),
                  }).subscribe(result => {
                      this.event = result.event;
                      this.uqjs = result.uqjs.results;
                  });
              } else {
                  this.router.navigate(['course/view', this.courseId]).then();
              }
          });
      }
  }

  getStatus(uqj: UQJ): string {
      // If the event exists, or if it is a non event, return default status text
      if (!uqj.question.event || !uqj.question.is_exam) {
          return uqj.status;
      }

      if (uqj.question.is_exam && uqj.num_attempts > 0) {
          return 'Submitted';
      } else if (uqj.question.is_exam) {
          return 'Not submitted';
      }
  }

  highlight(status: string): string {
      if (status.localeCompare('Solved') === 0) {
          console.log
          return 'highlight-success';
      } else if (status.localeCompare('Partially Solved') === 0) {
          return 'highlight-warning';
      } else if (status.localeCompare('Wrong') === 0) {
          return 'highlight-danger';
      }
    //   } else if (status.localeCompare('New') === 0) {
    //     return 'highlight-default';
    // }
      return 'highlight-defualt';
  }
}
