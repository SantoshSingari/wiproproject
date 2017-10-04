import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';    
import {ChartModule} from 'primeng/primeng';
import {DataTableModule,InputTextModule,ButtonModule,CalendarModule,TabMenuModule,CheckboxModule,TabViewModule,PasswordModule, SharedModule, SelectItem, MultiSelectModule,DialogModule,DropdownModule, AutoCompleteModule, SliderModule} from 'primeng/primeng';
import { AppComponent }  from './app.component';
// import { MessageAlert }  from './message.alert';
import { routing }        from './app.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {BusyModule} from 'angular2-busy';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, DashboardService,AuthenticationService, UserService,TagService,DeviceService,ProductService,SchedulesService,CategoryService } from './_services/index';
import {GlobalEventsManager} from './GlobalEventsManager';
import {NavComponent} from './nav/index';
import { SchedulesComponent } from './schedules/index';
import { LoginComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';
import { HomeComponent } from './home/index';
import { AppConfig } from './appconfig/index';
import {FixturesComponent } from './fixtures/index'
import {ManageComponent} from './manage/index';
import {UserComponent} from './user/user.component';
import {GrowlModule} from 'primeng/primeng';

//import { RegisterComponent } from './register/index';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TabMenuModule,
        routing,
        //ChartsModule,
        AccordionModule,
        DataTableModule,
        DialogModule,
        CheckboxModule,
        InputTextModule,
        TabViewModule,
        NgxDatatableModule,
        CalendarModule,
        SliderModule,
        BusyModule,
        ButtonModule,
        AutoCompleteModule,
        MultiSelectModule,
        DropdownModule,
        ChartModule,
        MaterialModule.forRoot(),
        GrowlModule
    ],
    declarations: [
        HomeComponent,
        AppComponent,
        AlertComponent,
        SchedulesComponent,
        LoginComponent,
        FixturesComponent,
        ManageComponent,
        UserComponent,
       // GlobalEventsManager,
        NavComponent,
        //RegisterComponent,
        DashboardComponent, 
        // MessageAlert,
        
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        TagService,
        CategoryService,
        DeviceService,
        DashboardService,
        SchedulesService,
        ProductService,
        GlobalEventsManager,
        // providers used to create fake backend
        
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }