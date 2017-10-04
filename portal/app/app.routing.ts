import { Routes, RouterModule } from '@angular/router';

import { SchedulesComponent } from './schedules/index';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { DashboardComponent } from './dashboard/index';
import {FixturesComponent } from './fixtures/index';
import { HomeComponent } from './home/index';
import {ManageComponent} from './manage/index';
import {UserComponent } from './user/user.component'
//import {RegisterComponent} from './register/index';
 
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent }, 
    { path: 'schedules', component: SchedulesComponent }, 
    { path: 'fixtures/:status/:mode/:db', component: FixturesComponent }, 
    { path: 'allfixtures', component: FixturesComponent }, 
    { path: 'manage', component: ManageComponent },
    {path:'user',component:UserComponent}, 
    //  { path: 'login/:loggedOut', component: LoginComponent },

    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);

