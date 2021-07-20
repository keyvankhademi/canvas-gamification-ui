import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseEventsSnippetComponent} from './course-events-snippet.component';
import {TestModule} from '@test/test.module';
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock";
import {CourseEventService} from "@app/course/_services/course-event.service";
import {CourseEventServiceMock} from "@app/problems/_test/course-event.service.mock";
import {MOCK_COURSE1} from "@app/course/_test/mock";

describe('CourseEventsSnippetComponent', () => {
    let component: CourseEventsSnippetComponent;
    let fixture: ComponentFixture<CourseEventsSnippetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [CourseEventsSnippetComponent],
            providers: [
                {provide: CourseEventService, useClass: CourseEventServiceMock},
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseEventsSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('open modal', () => {
        component.open('');
        expect(component.courseEvents).toEqual([MOCK_COURSE_EVENT]);
    });

    // TODO - Need to determine how to test toastr across application.
    it('duplicate an event', () => {
        component.duplicateEvent(MOCK_COURSE_EVENT, MOCK_COURSE1.id);
        fixture.detectChanges();
    });

});
