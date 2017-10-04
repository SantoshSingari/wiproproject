import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Category } from '../_models/index';
import { AppConfig } from '../appconfig/index';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoryService {
    constructor(private http: Http) { }
        getAll() {
        return this.http.get(AppConfig.BASE_URL + '/web/category/', this.jwt()).map((response: Response) => response.json());
        }
  
      private jwt() {
        // create authorization header with jwt token
        let basicAuth = localStorage.getItem('baiscAuth');
        if (basicAuth) {
            let headers = new Headers({ 'Authorization': basicAuth });
            return new RequestOptions({ headers: headers });
           }
     }
  }