import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Permission } from '../_models/Permission';

 
@Injectable()
export class PermissionService {
 
     BackendAPI: string = '';
 
 
    // constructor(private http: Http,
    //     private itemsService: ItemsService,
    //     private configService: ConfigService) {
    //     this.BackendAPI = configService.getApiURI();
    // }
 
    // getPermission(): Observable<Permission[]> {
    //     return this.http.get(this.BackendAPI + '/web/Permission')
    //         .map((res: Response) => {
    //             return res.json();
    //         })
    //         .catch(this.handleError);
    // }
 

 
    // createPermission(permission: Permission): Observable<Permission> {
 
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
 
    //     return this.http.post(this.BackendAPI + '/web/permission', JSON.stringify(permission), {
    //         headers: headers
    //     })
    //         .map((res: Response) => {
    //             return res.json();
    //         })
    //         .catch(this.handleError);
    // }
 
    // updatePermission(permission: Permission): Observable<void> {
 
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
 
    //     return this.http.put(this.BackendAPI + '/web/permission/' + Permission.id, JSON.stringify(permission), {
    //         headers: headers
    //     })
    //         .map((res: Response) => {
    //             return;
    //         })
    //         .catch(this.handleError);
    // }
 
    // deletePermission(id: number): Observable<void> {
    //     return this.http.delete(this.BackendAPI + '/web/permission/' + id)
    //         .map((res: Response) => {
    //             return;
    //         })
    //         .catch(this.handleError);
    // }
}