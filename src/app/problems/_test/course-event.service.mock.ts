import {Observable, of} from "rxjs";
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock";
import {CourseEvent, EventType} from "@app/_models";
import {MOCK_EVENT_TYPES} from "@app/course/_test/mock";
import {HttpResponse} from "@angular/common/http";

export class CourseEventServiceMock {
    getCourseEvent(id: number): Observable<CourseEvent> {
        return of(MOCK_COURSE_EVENT);
    }

    getEventTypes(): Observable<EventType[]> {
        return of(MOCK_EVENT_TYPES);
    }

    getAllEvents(): Observable<CourseEvent[]> {
        return of([MOCK_COURSE_EVENT]);
    }

    postDuplicateEvent(event: CourseEvent, courseId: number): Observable<HttpResponse<unknown>> {
        return of(new HttpResponse());
    }
}
