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
var DashboardService = (function () {
    function DashboardService(http) {
        this.http = http;
    }
    DashboardService.prototype.randomChart = function (duration) {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/dashboard/energy/' + { duration: duration } + '/refresh', this.jwt()).map(function (response) { return response.json(); });
    };
    DashboardService.prototype.energyConsumption = function (param) {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/dashboard/energy/' + param, this.jwt()).map(function (response) { return response.json(); });
    };
    DashboardService.prototype.getDeviceStatistics = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/dashboard/stats', this.jwt()).map(function (res) { return res.json(); });
    };
    DashboardService.prototype.getStatus = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/dashboard/status', this.jwt()).map(function (res) { return res.json(); });
    };
    DashboardService.prototype.getWattage = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/device/totalwattage', this.jwt()).map(function (res) { return res.json(); });
    };
    // private helper methods   
    DashboardService.prototype.jwt = function () {
        // create authorization header with jwt token
        var basicAuth = localStorage.getItem('baiscAuth');
        if (basicAuth) {
            var headers = new http_1.Headers({ 'Authorization': basicAuth });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return DashboardService;
}());
DashboardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map