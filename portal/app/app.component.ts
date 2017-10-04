import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import {GlobalEventsManager} from "./GlobalEventsManager";

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{


    showNavBar: boolean = false;
    private router: Router;
    private isSignedIn:boolean = false; 

    constructor(private globalEventsManager: GlobalEventsManager, private _router: Router) { 
        this.router = _router;
        this.router.events.subscribe((url:any) => console.log(url));

       // console.log(this.router.url);
        this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
            // mode will be null the first time it is created, so you need to igonore it when null
            if (mode !== null) {
              this.showNavBar = mode;
            }
        });
        
    }
    
    ngOnInit(){
       let value =  localStorage.getItem("isSignedIn");

       if(value=='true'){
           this.isSignedIn = true;
       } else {
           this.isSignedIn = false;
       }
    }
    
 }