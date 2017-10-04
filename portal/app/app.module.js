"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var material_1 = require("@angular/material");
var http_2 = require("@angular/http");
var primeng_1 = require("primeng/primeng"); //accordion and accordion tab
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
var app_component_1 = require("./app.component");
// import { MessageAlert }  from './message.alert';
var app_routing_1 = require("./app.routing");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var angular2_busy_1 = require("angular2-busy");
var index_1 = require("./_directives/index");
var index_2 = require("./_guards/index");
var index_3 = require("./_services/index");
var GlobalEventsManager_1 = require("./GlobalEventsManager");
var index_4 = require("./nav/index");
var index_5 = require("./schedules/index");
var index_6 = require("./login/index");
var index_7 = require("./dashboard/index");
var index_8 = require("./home/index");
var index_9 = require("./fixtures/index");
var index_10 = require("./manage/index");
var user_component_1 = require("./user/user.component");
var primeng_4 = require("primeng/primeng");
//import { RegisterComponent } from './register/index';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            primeng_3.TabMenuModule,
            app_routing_1.routing,
            //ChartsModule,
            primeng_1.AccordionModule,
            primeng_3.DataTableModule,
            primeng_3.DialogModule,
            primeng_3.CheckboxModule,
            primeng_3.InputTextModule,
            primeng_3.TabViewModule,
            ngx_datatable_1.NgxDatatableModule,
            primeng_3.CalendarModule,
            primeng_3.SliderModule,
            angular2_busy_1.BusyModule,
            primeng_3.ButtonModule,
            primeng_3.AutoCompleteModule,
            primeng_3.MultiSelectModule,
            primeng_3.DropdownModule,
            primeng_2.ChartModule,
            material_1.MaterialModule.forRoot(),
            primeng_4.GrowlModule
        ],
        declarations: [
            index_8.HomeComponent,
            app_component_1.AppComponent,
            index_1.AlertComponent,
            index_5.SchedulesComponent,
            index_6.LoginComponent,
            index_9.FixturesComponent,
            index_10.ManageComponent,
            user_component_1.UserComponent,
            // GlobalEventsManager,
            index_4.NavComponent,
            //RegisterComponent,
            index_7.DashboardComponent,
        ],
        providers: [
            index_2.AuthGuard,
            index_3.AlertService,
            index_3.AuthenticationService,
            index_3.UserService,
            index_3.TagService,
            index_3.CategoryService,
            index_3.DeviceService,
            index_3.DashboardService,
            index_3.SchedulesService,
            index_3.ProductService,
            GlobalEventsManager_1.GlobalEventsManager,
            // providers used to create fake backend
            http_2.BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map