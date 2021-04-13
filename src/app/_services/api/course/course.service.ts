import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {APIResponse, Course, CourseRegistrationRequest, CourseRegistrationResponse, MESSAGE_TYPES, RegistrationStatus} from '@app/_models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {MessageService} from '@app/_services/message.service';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private courseUrl = new URL(
        '/api/course',
        environment.apiBaseUrl
    ).toString();

    constructor(private http: HttpClient,
                private messageService: MessageService,) {
    }

    getUserStats(courseId: number, categoryId: number): Observable<any> {
        return this.http
            .get<any>(`${this.courseUrl}/${courseId}/user-stats/${categoryId}`)
            .pipe(catchError(this.handleError<any>(
                `getUserStats`
            )));
    }

    register(courseId: number, data: CourseRegistrationRequest): any {
        return this.http
            .post<CourseRegistrationResponse>(`${this.courseUrl}/${courseId}/register/`, data)
            .pipe(catchError(this.handleError<CourseRegistrationResponse>(
                `courseRegister`, {success: false, bad_request: true})));
    }

    registerVerify(courseId: number, data: CourseRegistrationRequest): any {
        return this.http
            .post<CourseRegistrationResponse>(`${this.courseUrl}/${courseId}/verify/`, data)
            .pipe(catchError(this.handleError<CourseRegistrationResponse>(
                `courseRegisterVerify`, {success: false, bad_request: true})));
    }

    getCourseRegistrationStatus(courseId: number): Observable<RegistrationStatus> {
        return this.http
            .get<RegistrationStatus>(`${this.courseUrl}/${courseId}/get-registration-status`)
            .pipe(catchError(this.handleError<RegistrationStatus>(
                `getCourseRegistrationStatus`
            )));
    }

    validateEvent(courseId: number, eventId: number, needsToBeRegistered = true): any {
        return this.http
            .get<APIResponse>(`${this.courseUrl}/${courseId}/validate-event/${eventId}/?registered=${needsToBeRegistered}`)
            .pipe(catchError(this.handleError<APIResponse>(
                `validateEvent`, {success: false, bad_request: true})));
    }

    /**
     * Retrieve all courses with their info
     * @param registered - Filter retrieved courses by if this user is registered in them or not
     * @param options - Object of options for this request
     */
    getCourses(registered = false, options?: any): Observable<Course[]> {
        const {filters = {}, ordering = {}, page = 1, page_size = 50} = options ? options : {};
        let params = new HttpParams()
            .set('registered', String(registered))
            .set('page', page)
            .set('page_size', page_size);

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        const orderingFields = [];
        for (const field of Object.keys(ordering)) {
            if (ordering[field]) {
                orderingFields.push(`${field}`);
            } else {
                orderingFields.push(`-${field}`);
            }
        }
        params = params.set(`ordering`, `${orderingFields.join()}`);

        return this.http
            .get<Course[]>(this.courseUrl, {params})
            .pipe(catchError(this.handleError<Course[]>(`getCourses`)));
    }


    /**
     * Retrieve a specific course with it's info
     * @param courseId - Corresponds to the id of the course, NOT the course_id field
     * @param registered - Filter retrieved courses by if this user is registered in them or not
     * @param options - Object of options for this request
     */
    getCourse(courseId: number, registered = false, options?: any): Observable<Course> {
        const {filters = {}} = options ? options : {};
        let params = new HttpParams()
            .set('registered', String(registered));

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        const url = `${this.courseUrl}/${courseId}`;
        return this.http
            .get<Course>(url, {params})
            .pipe(catchError(this.handleError<Course>(`getCourse`)));
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            if (operation === 'validateEvent') {
                this.messageService.add(
                    MESSAGE_TYPES.DANGER, 'You don\'t have the correct permissions to access that course or event!');
            }
            return of(result as T);
        };
    }
}
