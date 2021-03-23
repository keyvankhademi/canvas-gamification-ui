import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Category, Course, Question, User} from '@app/_models';
import {CourseEvent} from '@app/_models/courseEvent';
import {QuestionService} from '@app/_services/api/question.service';
import {MessageService} from '@app/_services/message.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseService} from '@app/_services/api/course.service';
import {CategoryService} from '@app/_services/api/category.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-parsons-create-snippet',
    templateUrl: './parsons-create-snippet.component.html',
    styleUrls: ['./parsons-create-snippet.component.scss']
})
export class ParsonsCreateSnippetComponent implements OnInit {
    ParsonsFormData: FormGroup;
    courses: Course[];
    events: CourseEvent[];
    selectedCourse: number;
    categories: Category[];
    user: User;

    constructor(private questionService: QuestionService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private authenticationService: AuthenticationService,
                private courseService: CourseService,
                private categoryService: CategoryService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        const coursesObservable = this.courseService.getCourses();
        const categoriesObservable = this.categoryService.getCategories();

        forkJoin([coursesObservable, categoriesObservable]).subscribe(result => {
            this.courses = result[0];
            this.categories = result[1];
        });

        this.ParsonsFormData = this.formBuilder.group({
            title: new FormControl(''),
            difficulty: new FormControl(''),
            category: new FormControl(''),
            course: new FormControl(''),
            event: new FormControl(''),
            text: new FormControl(''),
            junit_template: new FormControl(''),
            lines: new FormControl(''),
            additional_file_name: new FormControl(''),

            // Hard coded for now...
            author: new FormControl(1),
            max_submission_allowed: new FormControl(100),
            is_verified: new FormControl(true),
        });
    }

    onSubmit(FormData) {
        FormData.lines = FormData.lines.split(',');
        this.questionService.postParsonsQuestion(FormData)
            .subscribe(response => {
                this.messageService.addSuccess('The Question has been Created Successfully.');
                const jsonResponse: Question = JSON.parse(response);
                // this.questionService.putQuestion({
                //     event: this.MCQFormData.controls.event,
                // }, jsonResponse.id).subscribe(updateResponse => {
                // }, error => {
                //     console.warn(error.responseText);
                //     console.log({error});
                //     });
            }, error => {
                console.warn(error.responseText);
                console.log({error});
            });

    }

    courseSelectedEvent(value) {
        this.courseSelectedById(+value.target.value);
    }

    courseSelectedById(courseId: number) {
        this.selectedCourse = courseId;
        if (this.courses) {
            this.courses.forEach(course => {
                if (course.course_id === this.selectedCourse) {
                    this.events = course.events;
                }
            });
        }
    }
}
