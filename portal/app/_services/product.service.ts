
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Product } from '../_models/index';
import { AppConfig } from '../appconfig/index';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ProductService {

    constructor(private http: Http) { }
    getAll(): Observable<Product[]> {
        return this.http.get(AppConfig.BASE_URL + '/web/product/', this.jwt()).map(res => <Product[]>res.json());
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