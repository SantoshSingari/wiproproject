"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./schedules/index");
var index_2 = require("./login/index");
var index_3 = require("./_guards/index");
var index_4 = require("./dashboard/index");
var index_5 = require("./fixtures/index");
var index_6 = require("./home/index");
var index_7 = require("./manage/index");
var user_component_1 = require("./user/user.component");
//import {RegisterComponent} from './register/index';
var appRoutes = [
    { path: 'home', component: index_6.HomeComponent, canActivate: [index_3.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'dashboard', component: index_4.DashboardComponent },
    { path: 'schedules', component: index_1.SchedulesComponent },
    { path: 'fixtures/:status/:mode/:db', component: index_5.FixturesComponent },
    { path: 'allfixtures', component: index_5.FixturesComponent },
    { path: 'manage', component: index_7.ManageComponent },
    { path: 'user', component: user_component_1.UserComponent },
    //  { path: 'login/:loggedOut', component: LoginComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map