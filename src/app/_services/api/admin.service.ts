import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {Observable, of} from 'rxjs';
import {NestedCategories} from '@app/_models/category';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {QuestionCount} from '@app/_models/question_counts';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private categoryStatsUrl = new URL('/api/admin/category-stats/', environment.apiBaseUrl).toString();
    private questionCountUrl = new URL('/api/admin/question-count/', environment.apiBaseUrl).toString();

    constructor(private http: HttpClient) {
    }

    getCategoryStats(): Observable<NestedCategories[]> {
        return this.http
            .get<NestedCategories[]>(this.categoryStatsUrl)
            .pipe(catchError(this.handleError<NestedCategories[]>('getCategoryStats', [])));
    }

    getQuestionCounts(): Observable<QuestionCount[]> {
        return this.http
            .get<QuestionCount[]>(this.questionCountUrl)
            .pipe(catchError(this.handleError<QuestionCount[]>('getQuestionCounts', [])));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
