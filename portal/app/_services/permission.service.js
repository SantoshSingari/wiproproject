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
var PermissionService = (function () {
    function PermissionService(http) {
        this.http = http;
    }
    PermissionService.prototype.getAll = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/api/permission/', this.jwt()).map(function (response) { return response.json(); });
    };
    PermissionService.prototype.getById = function (id) {
        return this.http.get('/api/permission/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    PermissionService.prototype.create = function (permission) {
        return this.http.post('/api/permission', permission, this.jwt()).map(function (response) { return response.json(); });
    };
    PermissionService.prototype.update = function (permission) {
        return this.http.put('/api/permission/' + permission.id, permission, this.jwt()).map(function (response) { return response.json(); });
    };
    PermissionService.prototype.delete = function (id) {
        return this.http.delete('/api/permission/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    PermissionService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentPermission = JSON.parse(localStorage.getItem('currentPermission'));
        if (currentPermission && currentPermission.token) {
            var headers = new http_1.Headers({ 'Authorization': currentPermission.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return PermissionService;
}());
PermissionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map