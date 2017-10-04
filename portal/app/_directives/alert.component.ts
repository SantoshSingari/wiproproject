import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}

/*@Directive({
  selector: 'click-stop-propagation'
  events: 'stopClick($event)'
})

class ClickStopPropagation {
  stopClick(event:Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}*/