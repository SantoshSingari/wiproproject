import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalEventsManager } from '../GlobalEventsManager';

import { AlertService, AuthenticationService } from '../_services/index';
import { User } from '../_models/index';
import { UserService } from '../_services/user.service';
import { Message } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'

})

export class LoginComponent implements OnInit {
    user = new User();
    loading = false;
    returnUrl: string;
    isSignedIn = false;
    showNavBar: boolean = false;
    showMenu: boolean = false;
    main: boolean = false;
    msgs: Message[] = [];
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,

        private router: Router,
        private globalEventsManger: GlobalEventsManager,
        // private user:User,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {



        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();


        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

         if (localStorage.getItem('isSignedIn') == 'true') {
            let dashboard = "/dashboard";
            this.main = true;
            this.showNavBar = true;
            this.globalEventsManger.showNavBar(true);
            this.router.navigate([dashboard]);
        }

    }


    login(user: User) {
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

        this.userService.getUser(user).subscribe(userObj => {
            if (userObj === null) {
                this.showErrorMsg('error', "Please Valid Credentials");
                console.log('user is null password or email wrong');
            } else {
                console.log(userObj.email);
                localStorage.setItem('currentUser', JSON.stringify(userObj));
                let basic: string = "Basic " + btoa(user.userName + ":" + user.password);
                localStorage.setItem('baiscAuth', basic);
                localStorage.setItem('isSignedIn', 'true');
                let dashboard = "/dashboard";
                this.main = true;
                this.showNavBar = true;
                this.globalEventsManger.showNavBar(true);
                this.router.navigate([dashboard]);
                window.location.reload();
            }
        }, error => {
            this.showErrorMsg('error', "Please enter valid credentials");
        });
    }

    showErrorMsg(severity: string, message: string) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: message });
        setTimeout(() => {
            this.msgs = [];
        }, 2000);
    }

}