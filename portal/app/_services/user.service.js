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
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getAll = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/user/', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getScenes = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/scene/', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getUser = function (user) {
        var headers = new http_1.Headers();
        var basic = "Basic " + btoa(user.userName + ":" + user.password);
        headers.append("Authorization", basic);
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/user', {
            headers: headers
        }).map(function (res) { return res.json(); });
    };
    UserService.prototype.getById = function (id) {
        return this.http.get('/web/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.createUser = function (user) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/user', user, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.createScene = function (scene) {
        return this.http.post(index_1.AppConfig.BASE_URL + '/web/scene', scene, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.updateUser = function (user) {
        return this.http.put(index_1.AppConfig.BASE_URL + '/web/user', user, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.updateScene = function (scene) {
        return this.http.put(index_1.AppConfig.BASE_URL + '/web/scene', scene, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.deleteUser = function (userUids) {
        var headers = new http_1.Headers();
        var basicAuth = localStorage.getItem('baiscAuth');
        headers.append("Authorization", basicAuth);
        return this.http.delete(index_1.AppConfig.BASE_URL + '/web/user', new http_1.RequestOptions({
            headers: headers,
            body: userUids
        })).map(function (response) { return response.json(); });
    };
    UserService.prototype.deleteScene = function (sceneUids) {
        var headers = new http_1.Headers();
        var basicAuth = localStorage.getItem('baiscAuth');
        headers.append("Authorization", basicAuth);
        return this.http.delete(index_1.AppConfig.BASE_URL + '/web/scene', new http_1.RequestOptions({
            headers: headers,
            body: sceneUids
        })).map(function (response) { return response.json(); });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var basicAuth = localStorage.getItem('baiscAuth');
        if (basicAuth) {
            var headers = new http_1.Headers({ 'Authorization': basicAuth });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map