"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var PermissionService = (function () {
    function PermissionService() {
        this.BackendAPI = '';
        // constructor(private http: Http,
        //     private itemsService: ItemsService,
        //     private configService: ConfigService) {
        //     this.BackendAPI = configService.getApiURI();
        // }
        // getPermission(): Observable<Permission[]> {
        //     return this.http.get(this.BackendAPI + '/web/Permission')
        //         .map((res: Response) => {
        //             return res.json();
        //         })
        //         .catch(this.handleError);
        // }
        // createPermission(permission: Permission): Observable<Permission> {
        //     let headers = new Headers();
        //     headers.append('Content-Type', 'application/json');
        //     return this.http.post(this.BackendAPI + '/web/permission', JSON.stringify(permission), {
        //         headers: headers
        //     })
        //         .map((res: Response) => {
        //             return res.json();
        //         })
        //         .catch(this.handleError);
        // }
        // updatePermission(permission: Permission): Observable<void> {
        //     let headers = new Headers();
        //     headers.append('Content-Type', 'application/json');
        //     return this.http.put(this.BackendAPI + '/web/permission/' + Permission.id, JSON.stringify(permission), {
        //         headers: headers
        //     })
        //         .map((res: Response) => {
        //             return;
        //         })
        //         .catch(this.handleError);
        // }
        // deletePermission(id: number): Observable<void> {
        //     return this.http.delete(this.BackendAPI + '/web/permission/' + id)
        //         .map((res: Response) => {
        //             return;
        //         })
        //         .catch(this.handleError);
        // }
    }
    return PermissionService;
}());
PermissionService = __decorate([
    core_1.Injectable()
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map