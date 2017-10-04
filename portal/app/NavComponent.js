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
var core_1 = require("@angular/core");
var GlobalEventsManager_1 = require("./GlobalEventsManager");
var NavComponent = (function () {
    function NavComponent(globalEventsManager) {
        var _this = this;
        this.globalEventsManager = globalEventsManager;
        this.showNavBar = false;
        this.globalEventsManager.showNavBarEmitter.subscribe(function (mode) {
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
                _this.showNavBar = mode;
            }
        });
    }
    return NavComponent;
}());
NavComponent = __decorate([
    core_1.Component({
        selector: "navbar",
        templateUrl: "nav.html"
    }),
    __metadata("design:paramtypes", [GlobalEventsManager_1.GlobalEventsManager])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=NavComponent.js.map