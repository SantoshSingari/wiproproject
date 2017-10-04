import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Component, OnInit } from '@angular/core';
import {UserService }  from '../_services/index';
import {User,Status }  from '../_models/index';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    showMenu:boolean=true;
 
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
//        this.loadAllUsers();
    }
}