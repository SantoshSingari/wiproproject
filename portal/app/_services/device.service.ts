import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Device } from '../_models/index';
import { DeviceStatus, Status, NewTagDevice } from '../_models/index';
import { AppConfig } from '../appconfig/index';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class DeviceService {
    constructor(private http: Http) { }
    getAll() {
        return this.http.get(AppConfig.BASE_URL + '/api/device/', this.jwt()).map((response: Response) => response.json());
    }
    getDeviceList() {
        return this.http.get(AppConfig.BASE_URL + '/web/device/', this.jwt()).map((response: Response) => response.json());
    }



    getDeviceListWithTags() {
        return this.http.get(AppConfig.BASE_URL + '/web/device/withtag', this.jwt()).map((response: Response) => response.json());
    }

    discovery() {
        return this.http.post(AppConfig.BASE_URL + '/web/device/discover', null, this.jwt()).map((response: Response) => response.json());

    }

    updateDevice(device: Device): Observable<Status> {
        return this.http.put(AppConfig.BASE_URL + '/web/device', device, this.jwt()).map(res => <Status>res.json());
    }


    tagDevice(tagDevice: NewTagDevice): Observable<Status> {
        return this.http.post(AppConfig.BASE_URL + '/web/device/tag', tagDevice, this.jwt()).map(res => <Status>res.json());
    }
    unTagDevice(deviceUids:string[], tagUid:string): Observable<Status> {
        return this.http.post(AppConfig.BASE_URL + '/web/device/untag/' + tagUid , deviceUids, this.jwt()).map(res => <Status>res.json());
    }

    getDevicesByTagUids(tagUids: string[], category: string): Observable<Device[]> {
        return this.http.post(AppConfig.BASE_URL + '/web/device/' + category + '/bytag', tagUids, this.jwt()).map(res => <Device[]>res.json());
    }

    getByCategory(category: string): Observable<Device[]> {
        return this.http.get(AppConfig.BASE_URL + '/web/device/' + category, this.jwt()).map(res => <Device[]>res.json());
    }


    operatePower(deviceUid: string, op: number): Observable<Status> {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(AppConfig.BASE_URL + '/web/device/' + deviceUid + '/op/' + op, this.jwt()).map(res => <Status>res.json());
    }

    sendCommand(deviceUid: string, op: number): Observable<Status> {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(AppConfig.BASE_URL + '/web/device/' + deviceUid + '/op/' + op, this.jwt()).map(res => <Status>res.json());
    }

    setScene(device: Device, sceneUid: string): Observable<Status> {
        var deviceUid = "";
        if (device == null || device == undefined) {
            deviceUid = '*';
        } else {
            deviceUid = device.uid;
        }
        return this.http.post(AppConfig.BASE_URL + '/web/device/' + deviceUid + '/scene/' + sceneUid, this.jwt()).map(res => <Status>res.json());
    }

    setSceneForTags(category:string, sceneUid: string, tagUids:string[]): Observable<Status> {
      
        return this.http.post(AppConfig.BASE_URL + '/web/device/scene/' + sceneUid + '/' + category, tagUids, this.jwt()).map(res => <Status>res.json());
    }

    setIntensity(deviceUid: string, op: number): Observable<Status> {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(AppConfig.BASE_URL + '/web/device/' + deviceUid + '/intensity/' + op, this.jwt()).map(res => <Status>res.json());
    }

    powerOp(deviceUid: string, op: number): Observable<Status> {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(AppConfig.BASE_URL + '/web/device/' + deviceUid + '/power/' + op, this.jwt()).map(res => <Status>res.json());
    }

     powerOpForTag(tagUids: string[], op: number): Observable<Status> {
        return this.http.post(AppConfig.BASE_URL + '/web/device/tag/power/' + op, tagUids, this.jwt()).map(res => <Status>res.json());
    }

    setIntensityForTag(tagUids: string[], op: number): Observable<Status> {
        return this.http.post(AppConfig.BASE_URL + '/web/device/tag/intensity/' + op, tagUids, this.jwt()).map(res => <Status>res.json());
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