import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Role } from '../_models/index';
import {AppConfig} from '../appconfig/index';

@Injectable()
export class RoleService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(AppConfig.BASE_URL+'/api/role/', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/role/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(role: Role) {
        return this.http.post('/api/role', role, this.jwt()).map((response: Response) => response.json());
    }

    update(role: Role) {
        return this.http.put('/api/role/' + role.id, role, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/role/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentRole = JSON.parse(localStorage.getItem('currentRole'));
        if (currentRole && currentRole.token) {
            let headers = new Headers({ 'Authorization': currentRole.token });
            return new RequestOptions({ headers: headers });
        }
    }
}