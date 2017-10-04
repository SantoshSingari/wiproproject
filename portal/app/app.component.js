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
var router_1 = require("@angular/router");
var GlobalEventsManager_1 = require("./GlobalEventsManager");
var AppComponent = (function () {
    function AppComponent(globalEventsManager, _router) {
        var _this = this;
        this.globalEventsManager = globalEventsManager;
        this._router = _router;
        this.showNavBar = false;
        this.isSignedIn = false;
        this.router = _router;
        this.router.events.subscribe(function (url) { return console.log(url); });
        // console.log(this.router.url);
        this.globalEventsManager.showNavBarEmitter.subscribe(function (mode) {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
                _this.showNavBar = mode;
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var value = localStorage.getItem("isSignedIn");
        if (value == 'true') {
            this.isSignedIn = true;
        }
        else {
            this.isSignedIn = false;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app',
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [GlobalEventsManager_1.GlobalEventsManager, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map