"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var index_1 = require("../appconfig/index");
var DeviceService = (function () {
    function DeviceService(http) {
        this.http = http;
    }
    DeviceService.prototype.getAll = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/api/device/', this.jwt()).map(function (response) { return response.json(); });
    };
    DeviceService.prototype.getDeviceList = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/device/', this.jwt()).map(function (response) { return response.json(); });
    };
    DeviceService.prototype.getDeviceListWithTags = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/device/withtag', this.jwt()).map(function (response) { return response.json(); });
    };
    DeviceService.prototype.discovery = function () {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/discover', null, this.jwt()).map(function (response) { return response.json(); });
    };
    DeviceService.prototype.updateDevice = function (device) {
        return this.http.put(index_1.AppConfig.BASE_URL + '/web/device', device, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.tagDevice = function (tagDevice) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/tag', tagDevice, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.unTagDevice = function (deviceUids, tagUid) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/untag/' + tagUid, deviceUids, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.getDevicesByTagUids = function (tagUids, category) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/' + category + '/bytag', tagUids, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.getByCategory = function (category) {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/device/' + category, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.operatePower = function (deviceUid, op) {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/' + deviceUid + '/op/' + op, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.sendCommand = function (deviceUid, op) {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/' + deviceUid + '/op/' + op, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.setScene = function (device, sceneUid) {
        var deviceUid = "";
        if (device == null || device == undefined) {
            deviceUid = '*';
        }
        else {
            deviceUid = device.uid;
        }
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/' + deviceUid + '/scene/' + sceneUid, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.setSceneForTags = function (category, sceneUid, tagUids) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/scene/' + sceneUid + '/' + category, tagUids, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.setIntensity = function (deviceUid, op) {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/' + deviceUid + '/intensity/' + op, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.powerOp = function (deviceUid, op) {
        if (deviceUid == null) {
            deviceUid = '*';
        }
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/' + deviceUid + '/power/' + op, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.powerOpForTag = function (tagUids, op) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/tag/power/' + op, tagUids, this.jwt()).map(function (res) { return res.json(); });
    };
    DeviceService.prototype.setIntensityForTag = function (tagUids, op) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/device/tag/intensity/' + op, tagUids, this.jwt()).map(function (res) { return res.json(); });
    };
    // private helper methods
    DeviceService.prototype.jwt = function () {
        // create authorization header with jwt token
        var basicAuth = localStorage.getItem('baiscAuth');
        if (basicAuth) {
            var headers = new http_1.Headers({ 'Authorization': basicAuth });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return DeviceService;
}());
DeviceService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map