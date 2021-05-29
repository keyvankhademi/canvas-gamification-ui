import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Difficulty} from '@app/_models/difficulty';
import {HttpClient} from '@angular/common/http';
import {ApiService} from "@app/_services/api.service";

@Injectable({
    providedIn: 'root'
})
export class DifficultyService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    getDifficulties(): Observable<Difficulty[]> {
        const url = this.apiService.getURL('difficulty');
        return this.http.get<Difficulty[]>(url);
    }
}
