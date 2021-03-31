import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseEvent} from '@app/_models';
import {CourseEventService} from '@app/_services/api/course/course-event.service';
import {interval, Subscription} from 'rxjs';
// TODO: Make changes to import properly from @app/_models for both
// import { EventInfo, UpdateEvent} from '@app/_models';


@Component({
    selector: 'app-course-event-create',
    templateUrl: './course-event-create.component.html',
    styleUrls: ['./course-event-create.component.scss']
})
export class CourseEventCreateComponent implements OnInit {

    courseId: number;
    minDateISO: string;
    eventId: number;
    invalid: boolean;

    // Two way bound variables on inputs
    eventName: string;
    eventType: string;
    countsForTokens: boolean;
    startTime: Date;
    endTime: Date;

    constructor(private route: ActivatedRoute, private courseEventService: CourseEventService) {
    }

    // TODO: Reroute if you try and navigate to a page like this without clicking the button?
    ngOnInit(): void {
        this.getMinDate();
        // Convert to number
        this.courseId = +this.route.snapshot.paramMap.get('courseId');
        if (this.route.snapshot.paramMap.get('eventId')) {
            this.eventId = +this.route.snapshot.paramMap.get('eventId');
            this.courseEventService.getCourseEvent(this.eventId).subscribe(
                event => {
                    this.eventName = event.name;
                    this.eventType = event.type;
                    this.startTime = event.start_date;
                    this.endTime = event.end_date;
                    this.countsForTokens = event.count_for_tokens;
                    this.checkCanSubmit();
                }
            );
        }else{
            this.countsForTokens = false; // needs a default value specifically
            this.invalid = true;
        }

    }

    // TODO: Set the mindate to a higher number?
    getMinDate(): void {
        const d = new Date();
        this.minDateISO = d.toISOString().split('.')[0];
    }

    retrieveFormData(): CourseEvent {
        return {
            id: this.eventId,
            name: this.eventName,
            type: this.eventType,
            count_for_tokens: this.countsForTokens,
            start_date: this.startTime,
            end_date: this.endTime,
            course: this.courseId
        };
    }

    submitEvent(): void {
        const ourEvent: CourseEvent = this.retrieveFormData();

        if (this.eventId) { // If this is a previously existing event
            this.courseEventService.updateCourseEvent(ourEvent).subscribe();
        } else { // Creating a brand new event
            this.courseEventService.addCourseEvent(ourEvent).subscribe(
                newEvent => {
                    console.log(newEvent);
                    // TODO: router.navigate(['event/', newEvent.id])
                }
            );
        }
    }

    checkCanSubmit(): void {
        console.log("authenticating")
        if(this.eventName && this.eventType && this.startTime && this.endTime){
            console.log("all variables are non null")
            if(this.eventName.length > 0 && this.eventType.length > 0 && this.endTime > this.startTime){
                this.invalid = false;
                return;
            }
        }
        this.invalid = true;
    }
}
