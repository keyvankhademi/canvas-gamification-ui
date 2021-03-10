import {Component, Input, OnInit} from '@angular/core';
import {Question, UQJ, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';

@Component({
  selector: 'app-course-question-snippet',
  templateUrl: './course-question-snippet.component.html',
  styleUrls: ['./course-question-snippet.component.scss']
})
export class CourseQuestionSnippetComponent implements OnInit {
  @Input() questions: Question[];
  @Input() uqjs: UQJ[];
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    console.log(this.uqjs);
  }

  getStatus(uqj: UQJ): string {
    if (!uqj.question.event || !uqj.question.event.is_exam) { // If the event exists
      return uqj.status;
    }
    if (uqj.question.event.is_exam && uqj.num_attempts > 0) {
      return 'Submitted';
    } else if (uqj.question.event.is_exam) {
      return 'Not submitted';
    }
  }

  // TODO: FIX THIS FUNCTION
  isStudent() {
    return false;
    // return this.user.is_student;
  }

  isTeacher() {
    return false;
    // return this.user.is_teacher;
  }
}
