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
var GlobalEventsManager_1 = require("../GlobalEventsManager");
var index_1 = require("../_services/index");
var index_2 = require("../_models/index");
var user_service_1 = require("../_services/user.service");
var LoginComponent = (function () {
    function LoginComponent(userService, route, router, globalEventsManger, 
        // private user:User,
        authenticationService, alertService) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.globalEventsManger = globalEventsManger;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.user = new index_2.User();
        this.loading = false;
        this.isSignedIn = false;
        this.showNavBar = false;
        this.showMenu = false;
        this.main = false;
        this.msgs = [];
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        if (localStorage.getItem('isSignedIn') == 'true') {
            var dashboard = "/dashboard";
            this.main = true;
            this.showNavBar = true;
            this.globalEventsManger.showNavBar(true);
            this.router.navigate([dashboard]);
        }
    };
    LoginComponent.prototype.login = function (user) {
        var _this = this;
        this.loading = true;
        if (!user.userName) {
            this.showErrorMsg('error', "Please enter a email address");
            return;
        }
        if (!user.password) {
            this.showErrorMsg('error', "Please enter Password");
            return;
        }
        user.email = user.userName;
        /*localStorage.setItem('currentUser', JSON.stringify(user));
                let home = "/home";
                this.showMenu=true;
                this.globalEventsManger.showNavBar(true);
                this.router.navigate([home]);*/
        this.userService.getUser(user).subscribe(function (userObj) {
            if (userObj === null) {
                _this.showErrorMsg('error', "Please Valid Credentials");
                console.log('user is null password or email wrong');
            }
            else {
                console.log(userObj.email);
                localStorage.setItem('currentUser', JSON.stringify(userObj));
                var basic = "Basic " + btoa(user.userName + ":" + user.password);
                localStorage.setItem('baiscAuth', basic);
                localStorage.setItem('isSignedIn', 'true');
                var dashboard = "/dashboard";
                _this.main = true;
                _this.showNavBar = true;
                _this.globalEventsManger.showNavBar(true);
                _this.router.navigate([dashboard]);
                window.location.reload();
            }
        }, function (error) {
            _this.showErrorMsg('error', "Please enter valid credentials");
        });
    };
    LoginComponent.prototype.showErrorMsg = function (severity, message) {
        var _this = this;
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: message });
        setTimeout(function () {
            _this.msgs = [];
        }, 2000);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router,
        GlobalEventsManager_1.GlobalEventsManager,
        index_1.AuthenticationService,
        index_1.AlertService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map