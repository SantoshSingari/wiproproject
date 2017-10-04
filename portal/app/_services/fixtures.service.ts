import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Device } from '../_models/index';
import { AppConfig }  from '../appconfig/index';

@Injectable()
export class FixturesService {
    constructor(private http: Http) { }

    // getAll() {
    //     return this.http.get(AppConfig.BASE_URL+'/api/device/', this.jwt()).map((response: Response) => response.json());
    // }

      getAll(device: Device) {
        return this.http.post(AppConfig.BASE_URL + '/api/device', JSON.stringify(device))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let tagList = response.json();
                
                   
            });
    }






    getById(id: number) {
        return this.http.get('/api/device/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(device: Device) {
        return this.http.post('/api/device', device, this.jwt()).map((response: Response) => response.json());
    }

    update(device: Device) {
        return this.http.put('/api/device/' + device.id, device, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/device/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentDevice = JSON.parse(localStorage.getItem('currentDevice'));
        if (currentDevice && currentDevice.token) {
            let headers = new Headers({ 'Authorization': currentDevice.token });
            return new RequestOptions({ headers: headers });
        }
    }
}