import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import {GlobalEventsManager} from "../GlobalEventsManager";
import {AuthenticationService} from "../_services";


@Component({
    moduleId: module.id,
    selector: 'nav',
    templateUrl: 'nav.component.html'
    //template:'dd'
})

export class NavComponent  {
    showNavBar: boolean = false;
    private router: Router;

    constructor(private globalEventsManager: GlobalEventsManager, private _router: Router) { 
        this.router = _router;
        this.router.events.subscribe((url:any) => console.log(url));
        //this.authenticationService = authenticationService;
       // console.log(this.router.url);
        this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
              this.showNavBar = mode;
            }
        });
        
    }
    

    signout(){
         localStorage.setItem('currentUser', null);
              
                localStorage.setItem('baiscAuth', null);
                localStorage.setItem('isSignedIn', 'false');
                let login = "/login";     
                //this.authenticationService.logout();          
                this.globalEventsManager.showNavBar(false);
                this.router.navigate([login]);
    }

 
}