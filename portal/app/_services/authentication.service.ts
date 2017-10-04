import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {AppConfig} from '../appconfig/index';
import { User } from '../_models/index';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(user: User) {
        let headers = new Headers();
        let basic = "Basic " + btoa(user.userName + ":" + user.password);
        headers.append("Authorization", basic)
        return this.http.get(AppConfig.BASE_URL + '/web/user', {
            headers:headers
        })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let resp = response.json();
                // user.token = "Basic " + btoa(user.userName + ":" + user.password);
                // localStorage.setItem('currentUser', JSON.stringify(user));
                   
            });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}