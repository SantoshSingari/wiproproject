import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Tag } from '../_models/index';
import {AppConfig} from '../appconfig/index';

@Injectable()
export class TagService {
    constructor(private http: Http) { }

    getByTags() {
        return this.http.get(AppConfig.BASE_URL+'/api/tag/', this.jwt()).map((response: Response) => response.json());
        
    }

    getByTagList() {
        return this.http.get(AppConfig.BASE_URL+'/api/tag/', this.jwt()).map((response: Response) => response.json());
        
    }

    getAll(){
        return this.http.get(AppConfig.BASE_URL+'/web/tag/',this.jwt()).map((response: Response) => response.json());
    }


    getById(id: number) {
        return this.http.get('/api/tag/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(tag: Tag) {
        return this.http.post('/api/', this.jwt()).map((response: Response) => response.json());
    }

    update(tag: Tag) {
        return this.http.put('/api/tag/' + tag.id, tag, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/tag/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getTopTags() {
        return this.http.get('/api/tag/top' , this.jwt()).map((response: Response) => response.json());
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