import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Schedules, Status } from '../_models/index';
import { AppConfig } from '../appconfig/index';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SchedulesService {
    constructor(private http: Http) { }

    getAll(): Observable<Schedules[]> {
        return this.http.get(AppConfig.BASE_URL + '/web/schedule/', this.jwt()).map(response => <Schedules[]>response.json());
    }


    createSchedules(schedule: Schedules): Observable<Status> {
        return this.http.post(AppConfig.BASE_URL + '/web/schedule', schedule, this.jwt()).map(response => <Status>response.json());
    }

    updateSchedules(schedule: Schedules): Observable<Status> {
        return this.http.put(AppConfig.BASE_URL + '/web/schedule', schedule, this.jwt()).map(response => <Status>response.json());
    }

    deleteSchedules(schedule: Schedules): Observable<Status> {
        let headers = new Headers();
        let basicAuth = localStorage.getItem('baiscAuth');
        headers.append("Authorization", basicAuth)
        return this.http.delete(AppConfig.BASE_URL + '/web/schedule', new RequestOptions({
            headers: headers,
            body: schedule
        })).map(response => <Status>response.json());
    }


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let basicAuth = localStorage.getItem('baiscAuth');
        if (basicAuth) {
            let headers = new Headers({ 'Authorization': basicAuth });
            return new RequestOptions({ headers: headers });
        }
    }
}