import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Permission } from '../_models/index';
import {AppConfig} from '../appconfig/index';

@Injectable()
export class PermissionService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(AppConfig.BASE_URL+'/api/permission/', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/permission/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(permission: Permission) {
        return this.http.post('/api/permission', permission, this.jwt()).map((response: Response) => response.json());
    }

    update(permission: Permission) {
        return this.http.put('/api/permission/' + permission.id, permission, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/permission/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentPermission = JSON.parse(localStorage.getItem('currentPermission'));
        if (currentPermission && currentPermission.token) {
            let headers = new Headers({ 'Authorization': currentPermission.token });
            return new RequestOptions({ headers: headers });
        }
    }
}