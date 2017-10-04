import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { DeviceStatus, Status, DevicesStats, TotalWattage } from '../_models/index';
import {AppConfig} from '../appconfig/index';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class DashboardService {
    constructor(private http: Http) { }
   

     randomChart(duration:string) :Observable<DevicesStats[]> {
     return this.http.get(AppConfig.BASE_URL+'/web/dashboard/energy/' + {duration} + '/refresh', this.jwt()).map(response => <DevicesStats[]>response.json());  
     }

    energyConsumption(param:string) :Observable<DevicesStats[]> {
        return this.http.get(AppConfig.BASE_URL+'/web/dashboard/energy/' + param, this.jwt()).map(response => <DevicesStats[]>response.json());  
    }
    
    getDeviceStatistics():Observable<DevicesStats> {
        return this.http.get(AppConfig.BASE_URL+'/web/dashboard/stats',this.jwt()).map(res=> <DevicesStats>res.json());
    }
     
    getStatus():Observable<DeviceStatus> {
        return this.http.get(AppConfig.BASE_URL+'/web/dashboard/status',this.jwt()).map(res=> <DeviceStatus>res.json());
    }
    getWattage():Observable<TotalWattage>{
        return this.http.get(AppConfig.BASE_URL+'/web/device/totalwattage',this.jwt()).map(res=> <TotalWattage>res.json());
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