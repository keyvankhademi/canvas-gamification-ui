import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, EventType, User} from '@app/_models';
import {AuthenticationService} from '@app/_services/api/authentication';
import {CourseEventService} from '@app/course/_services/course-event.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-course-events-snippet',
    templateUrl: './course-events-snippet.component.html',
    styleUrls: ['./course-events-snippet.component.scss']
})
export class CourseEventsSnippetComponent implements OnInit {
    @Input() events: CourseEvent[];
    @Input() courseId: number;
    eventTypes: EventType[];
    eventTypesMap: Map<string, string>;
    user: User;
    courseEvents: CourseEvent[];

    constructor(private authenticationService: AuthenticationService,
                private courseEventService: CourseEventService,
                private toastr: ToastrService,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.courseEventService.getEventTypes().subscribe(response => {
            this.eventTypes = response;
            this.eventTypesMap = new Map(this.eventTypes.map(([k, v]) => [k, v])); //Make a map for easy access
        });
    }

    /**
     * Determines the text for the button based on the user's role and event.
     * @param event - The event to check the user against.
     */
    getEventButtonText(event: CourseEvent): string {
        if (this.eventTypes) {
            return ((this.user.is_teacher) ? 'Open ' : 'Do ') + this.eventTypesMap.get(event.type);
        }
    }

    /**
     * Determines if the current event is an exam that is also open.
     * @param event - The event to check.
     */
    isExamAndOpen(event: CourseEvent): boolean {
        return event.is_open && event.is_exam;
    }

    /**
     * Opens a given modal.
     * @param content - The modal to open.
     */
    open(content: unknown): void {
        this.courseEventService.getAllEvents().subscribe(events => this.courseEvents = events);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
    }

    /**
     * Duplicates the selected event.
     * @param event - The event to duplicate/import.
     * @param courseId - The course you are importing the event into.
     */
    duplicateEvent(event: CourseEvent, courseId: number): void {
        this.courseEventService.postDuplicateEvent(event, courseId).subscribe((response) => {
            if (response.status === 201) {
                this.toastr.success('The Event has been Imported Successfully.');
            }
        });
    }
}
