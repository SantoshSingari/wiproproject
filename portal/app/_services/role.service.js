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
var RoleService = (function () {
    function RoleService(http) {
        this.http = http;
    }
    RoleService.prototype.getAll = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/api/role/', this.jwt()).map(function (response) { return response.json(); });
    };
    RoleService.prototype.getById = function (id) {
        return this.http.get('/api/role/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    RoleService.prototype.create = function (role) {
        return this.http.post('/api/role', role, this.jwt()).map(function (response) { return response.json(); });
    };
    RoleService.prototype.update = function (role) {
        return this.http.put('/api/role/' + role.id, role, this.jwt()).map(function (response) { return response.json(); });
    };
    RoleService.prototype.delete = function (id) {
        return this.http.delete('/api/role/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    RoleService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentRole = JSON.parse(localStorage.getItem('currentRole'));
        if (currentRole && currentRole.token) {
            var headers = new http_1.Headers({ 'Authorization': currentRole.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return RoleService;
}());
RoleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map