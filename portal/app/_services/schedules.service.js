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
var SchedulesService = (function () {
    function SchedulesService(http) {
        this.http = http;
    }
    SchedulesService.prototype.getAll = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/schedule/', this.jwt()).map(function (response) { return response.json(); });
    };
    SchedulesService.prototype.createSchedules = function (schedule) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/schedule', schedule, this.jwt()).map(function (response) { return response.json(); });
    };
    SchedulesService.prototype.updateSchedules = function (schedule) {
        return this.http.put(index_1.AppConfig.BASE_URL + '/web/schedule', schedule, this.jwt()).map(function (response) { return response.json(); });
    };
    SchedulesService.prototype.deleteSchedules = function (schedule) {
        var headers = new http_1.Headers();
        var basicAuth = localStorage.getItem('baiscAuth');
        headers.append("Authorization", basicAuth);
        return this.http.delete(index_1.AppConfig.BASE_URL + '/web/schedule', new http_1.RequestOptions({
            headers: headers,
            body: schedule
        })).map(function (response) { return response.json(); });
    };
    // private helper methods
    SchedulesService.prototype.jwt = function () {
        // create authorization header with jwt token
        var basicAuth = localStorage.getItem('baiscAuth');
        if (basicAuth) {
            var headers = new http_1.Headers({ 'Authorization': basicAuth });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return SchedulesService;
}());
SchedulesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SchedulesService);
exports.SchedulesService = SchedulesService;
//# sourceMappingURL=schedules.service.js.map