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
var FixturesService = (function () {
    function FixturesService(http) {
        this.http = http;
    }
    // getAll() {
    //     return this.http.get(AppConfig.BASE_URL+'/api/device/', this.jwt()).map((response: Response) => response.json());
    // }
    FixturesService.prototype.getAll = function (device) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/api/device', JSON.stringify(device))
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var tagList = response.json();
        });
    };
    FixturesService.prototype.getById = function (id) {
        return this.http.get('/api/device/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    FixturesService.prototype.create = function (device) {
        return this.http.post('/api/device', device, this.jwt()).map(function (response) { return response.json(); });
    };
    FixturesService.prototype.update = function (device) {
        return this.http.put('/api/device/' + device.id, device, this.jwt()).map(function (response) { return response.json(); });
    };
    FixturesService.prototype.delete = function (id) {
        return this.http.delete('/api/device/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    FixturesService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentDevice = JSON.parse(localStorage.getItem('currentDevice'));
        if (currentDevice && currentDevice.token) {
            var headers = new http_1.Headers({ 'Authorization': currentDevice.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return FixturesService;
}());
FixturesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FixturesService);
exports.FixturesService = FixturesService;
//# sourceMappingURL=fixtures.service.js.map