
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
// import { TestModel } from '@app/_models/test_model';
import { ApiService } from '@app/_services/api.service';
import { LeaderBoardStudents } from '@app/_models/leader_board';

@Injectable({
    providedIn: 'root'
})
export class LeaderBoardService {
  private url = new URL('/api/leaderboard-students', environment.apiBaseUrl).toString();

  constructor(
    private http: HttpClient,
    private apiService: ApiService) {

  }

  getLeaderBoard(): Observable<LeaderBoardStudents[]> {

      return this.http
          .get<LeaderBoardStudents[]>(this.url)
          .pipe(catchError(this.apiService.handleError<LeaderBoardStudents[]>(`Unable to load leader board`, null)));
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

}
