import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User,Scene } from '../_models/index';
import { AppConfig } from '../appconfig/index';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll(): Observable<User[]> {
        return this.http.get(AppConfig.BASE_URL + '/web/user/', this.jwt()).map(response => <User[]>response.json());
    }

     getScenes(): Observable<Scene[]> {
        return this.http.get(AppConfig.BASE_URL + '/web/scene/', this.jwt()).map(response => <Scene[]>response.json());
    }

    getUser(user: User): Observable<User> {
        let headers = new Headers();
        let basic = "Basic " + btoa(user.userName + ":" + user.password);
        headers.append("Authorization", basic)
        return this.http.get(AppConfig.BASE_URL + '/web/user', {
            headers: headers
        }).map(res => <User>res.json());
    }

    getById(id: number) {
        return this.http.get('/web/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    createUser(user: User) {
        return this.http.post(AppConfig.BASE_URL + '/web/user', user, this.jwt()).map((response: Response) => response.json());
    }

    createScene(scene:Scene){
        return this.http.post(AppConfig.BASE_URL + '/web/scene', scene, this.jwt()).map((response: Response) => response.json());
    }

    updateUser(user: User) {
        return this.http.put(AppConfig.BASE_URL + '/web/user', user, this.jwt()).map((response: Response) => response.json());
    }
     updateScene(scene: Scene) {
        return this.http.put(AppConfig.BASE_URL + '/web/scene', scene, this.jwt()).map((response: Response) => response.json());
    }

    deleteUser(userUids: Array<string>) {
        let headers = new Headers();
        let basicAuth = localStorage.getItem('baiscAuth');
        headers.append("Authorization", basicAuth)
        return this.http.delete(AppConfig.BASE_URL + '/web/user', new RequestOptions({
            headers: headers,
            body: userUids
        })).map((response: Response) => response.json());
    }

    deleteScene(sceneUids: Array<string>) {
        let headers = new Headers();
        let basicAuth = localStorage.getItem('baiscAuth');
        headers.append("Authorization", basicAuth)
        return this.http.delete(AppConfig.BASE_URL + '/web/scene', new RequestOptions({
            headers: headers,
            body: sceneUids
        })).map((response: Response) => response.json());
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