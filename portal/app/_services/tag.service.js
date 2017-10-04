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
var TagService = (function () {
    function TagService(http) {
        this.http = http;
    }
    TagService.prototype.getByTags = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/api/tag/', this.jwt()).map(function (response) { return response.json(); });
    };
    TagService.prototype.getByTagList = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/api/tag/', this.jwt()).map(function (response) { return response.json(); });
    };
    TagService.prototype.getAll = function () {
        return this.http.get(index_1.AppConfig.BASE_URL + '/web/tag/', this.jwt()).map(function (response) { return response.json(); });
    };
    TagService.prototype.getById = function (id) {
        return this.http.get('/api/tag/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    TagService.prototype.create = function (tag) {
        return this.http.post('/api/', this.jwt()).map(function (response) { return response.json(); });
    };
    TagService.prototype.update = function (tag) {
        return this.http.put('/api/tag/' + tag.id, tag, this.jwt()).map(function (response) { return response.json(); });
    };
    TagService.prototype.delete = function (id) {
        return this.http.delete('/api/tag/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    TagService.prototype.getTopTags = function () {
        return this.http.get('/api/tag/top', this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods   
    TagService.prototype.jwt = function () {
        // create authorization header with jwt token
        var basicAuth = localStorage.getItem('baiscAuth');
        if (basicAuth) {
            var headers = new http_1.Headers({ 'Authorization': basicAuth });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return TagService;
}());
TagService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map