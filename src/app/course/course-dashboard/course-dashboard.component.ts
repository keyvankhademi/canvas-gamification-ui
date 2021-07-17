import {Component, OnInit} from '@angular/core';
import {CourseService} from '@app/course/_services/course.service';
import {Course, STATUS} from '@app/_models';

//imports from course-events-snippet.component.ts
import {Input} from '@angular/core';
import {CourseEvent, EventType, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseEventService} from '@app/course/_services/course-event.service';


@Component({
    selector: 'app-course-dashboard',
    templateUrl: './course-dashboard.component.html',
    styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent implements OnInit {

    @Input() events: CourseEvent[];
    @Input() courseId: number;
    eventTypes: EventType[];
    eventTypesMap: Map<string, string>;
    user: User;

    constructor(private authenticationService: AuthenticationService, private courseEventService: CourseEventService) {
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseEventService.getEventTypes().subscribe(response => {
            this.eventTypes = response;
            this.eventTypesMap = new Map(this.eventTypes.map(([k, v]) => [k, v])); //Make a map for easy access
        });
    }

    getEventButtonText(event: CourseEvent): string {
        if (this.eventTypes) {
            return ((this.user.is_teacher) ? 'Open ' : 'Do ') + this.eventTypesMap.get(event.type);
        }
    }

    isExamAndOpen(event: CourseEvent): boolean {
        return event.is_open && event.is_exam;
    }

}



//     activeCourses: Course[];

//     constructor(private courseService: CourseService) {
//     }

//     ngOnInit(): void {
//         this.courseService
//             .getCourses(true, {ordering: {name: true}})
//             ?.subscribe((courses) => {
//                 this.activeCourses = courses.filter(course => {
//                     return course.status === STATUS.active;
//                 });
//             });
//     }
// }
