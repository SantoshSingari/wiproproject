import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule, SelectItem, MultiSelectModule, CalendarModule, CheckboxModule, TabViewModule } from 'primeng/primeng';
import { SchedulesService, TagService } from '../_services/index';
import { Schedules, Tag } from '../_models/index';
import { GlobalEventsManager } from '../GlobalEventsManager';
import { Message } from 'primeng/primeng';
@Component({
  moduleId: module.id,
  templateUrl: 'schedules.component.html'
})



export class SchedulesComponent implements OnInit {
  schedulesList: Schedules[];
  private showMenu = true;
  tagList: Tag[];
  msgs: Message[] = [];
  displayDialog: boolean;
  schedules: Schedules = new Schedules();
  selectedSchedules: Schedules;
  newSchedules: boolean;
  tagsList: SelectItem[];
  weekdays: Array<any> = [];
  selectedweekdays: Array<any> = [];
  fromTime: Array<any>;
  toTime: Array<any>;
  selectedTags: any[];
  deleteSchedules: Array<any>;
  data: string;
  filteredTags: any[];
  allTags: Tag[];
  checked: boolean;
  globalIntensity: number = 0;
  selectedTime: Date;
  scheduleweekdays: any[] = [];
  isMonday: boolean = false;
  isTuesday: boolean = false;
  isWednesday: boolean = false;
  isThrusday: boolean = false;
  isFriday: boolean = false;
  isSatday: boolean = false;
  isSunday: boolean = false;

  constructor(private scheduleService: SchedulesService, private tagService: TagService,
    private globalEventsManger: GlobalEventsManager) {

  }
  ngOnInit() {
    this.getTags();
    this.getSchedules();
    this.globalEventsManger.showNavBar(true);
    this.tagsList = [];
  }

  getSchedules() {
    this.scheduleService.getAll().subscribe(schedules => {
      this.schedulesList = schedules;
      console.log(this.schedulesList, "schedules");
    })
  }

  setDay(day: number, b: boolean, schedule: Schedules) {
    if (day == 1) {
      if (b) {
        schedule.monDay = 1;
        this.isMonday = true;
      } else {
        schedule.monDay = 0;
        this.isMonday = false;
      }
    }

    if (day == 2) {
      if (b) {
        schedule.tuesDay = 1;
        this.isTuesday = true;
      } else {
        schedule.tuesDay = 0;
        this.isTuesday = false;
      }
    }

    if (day == 3) {
      if (b) {
        schedule.wednesDay = 1;
        this.isWednesday = true;
      } else {
        schedule.wednesDay = 0;
        this.isWednesday = false;
      }
    }

    if (day == 4) {
      if (b) {
        schedule.thrusDay = 1;
        this.isThrusday = true;
      } else {
        schedule.thrusDay = 0;
        this.isThrusday = false;
      }
    }

    if (day == 5) {
      if (b) {
        schedule.friDay = 1;
        this.isFriday = true;
      } else {
        schedule.friDay = 0;
        this.isFriday = false;
      }
    }

    if (day == 6) {
      if (b) {
        schedule.satDay = 1;
        this.isSatday = true;
      } else {
        schedule.satDay = 0;
        this.isSatday = false;
      }
    }

    if (day == 7) {
      if (b) {
        schedule.sunDay = 1;
        this.isSunday = true;
      } else {
        schedule.sunDay = 0;
        this.isSunday = false;
      }
    }
  }
  populateSchedulesData(schedule: Schedules) {
    if (schedule != null && schedule != undefined) {
      this.globalIntensity = schedule.intensity;
      var tags = schedule.tags;
      if (tags != null && tags != undefined) {
        var tagUids = tags.split(",");
        if (tagUids.length > 0) {
          if (this.tagList != undefined && this.tagList.length > 0) {
            this.selectedTags = [];
            for (var i = 0; i < tagUids.length; i++) {
              let tagUid = tagUids[i];
              for (var j = 0; j < this.tagList.length; j++) {
                let tag = this.tagList[j];
                if (tagUid == tag.uid) {
                  this.selectedTags.push(tag);
                }
              }
            }
          }
        }
      }
    }

    this.isFriday = schedule.friDay == 1 ? true : false;
    this.isMonday = schedule.monDay == 1 ? true : false;
    this.isSatday = schedule.satDay == 1 ? true : false;
    this.isSunday = schedule.sunDay == 1 ? true : false;
    this.isThrusday = schedule.thrusDay == 1 ? true : false;
    this.isTuesday = schedule.tuesDay == 1 ? true : false;
    this.isWednesday = schedule.wednesDay == 1 ? true : false;

  }

  devicePowerToggle(checked: boolean) {
    if (checked == true) {
      this.globalIntensity = 100;

    } else {
      this.globalIntensity = 0;
    }
  }

  getTags() {
    this.tagService.getAll().subscribe(tags => {
      this.tagList = tags;
      console.log(this.tagList);
    },
      error => {
        console.log(error);
      })
  }

  showDialogToAdd() {
    this.newSchedules = true;
    this.schedules = new Schedules();

    this.selectedTags = [];
    this.selectedweekdays = [];
    this.selectedTime = new Date();
    this.schedules.scheduleAtText = this.selectedTime.getHours() + ":00";
    this.displayDialog = true;
    this.globalIntensity = 0;
    this.isMonday = false;
    this.isTuesday = false;
    this.isWednesday = false;
    this.isThrusday = false;
    this.isFriday = false;
    this.isSatday = false;
    this.isSunday = false;
  }

  onRowSelect(event: any) {
    this.newSchedules = false;
    this.schedules = this.cloneSchedules(event.data);
    this.populateSchedulesData(this.schedules);
    this.displayDialog = true;
  }

  cloneSchedules(s: Schedules): Schedules {
    let schedules = new Schedules();
    for (let prop in s) {
      schedules[prop] = s[prop];
    }
    return schedules;
  }

  filterTags(event: any) {
    let query = event.query;
    this.filteredTags = [];
    for (let i = 0; i < this.tagList.length; i++) {
      let t = this.tagList[i];
      if (t.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.filteredTags.push(t);
      }
    }
    return this.filteredTags;
  }


  getCondition(sch: Schedules,b: boolean) {
     var weekday = new Array();
     var week:string="";
         if(sch.monDay){  week +=  " Mon " }
          if(sch.tuesDay){  week +=   " Tue " }
            if(sch.wednesDay){  week +=   " Wed " }
            if(sch.thrusDay){  week +=  " Thu "}
            if(sch.friDay){  week +=   " Fri " }
             if(sch.satDay){  week +=  " Sat " }
              if(sch.sunDay){  week  += " Sun " }
     
    return "Runs " + sch.tagNames + " on "+ week + " at time " + sch.scheduleAtText;
  }


  addSchedules(schedule: Schedules) {

    this.processSaveOrUpdate(schedule);

    this.scheduleService.createSchedules(schedule).subscribe(status => {
      this.getSchedules();
      this.displayDialog = false;
      this.filteredTags = [];
      this.showErrorMsg("success", status.message);
    },
      error => {
      })
  }

  processSaveOrUpdate(schedule: Schedules) {
    let strTag: string = "";
    let tagNames = "";
    if (this.selectedTags != undefined) {
      for (let i = 0; i < this.selectedTags.length; i++) {
        strTag = strTag + "," + this.selectedTags[i].uid;
        tagNames = tagNames + "," + this.selectedTags[i].name;
      }
    }

   if (this.selectedTime != undefined) {
     //var d = this.selectedTime.getHours() * 60 + this.selectedTime.getMinutes();
     var d = this.schedules.scheduleAtText.getHours() * 60 + this.schedules.scheduleAtText.getMinutes();
     schedule.scheduledAt = d;
     //schedule.scheduleAtText = this.selectedTime.getHours() + ":" + this.selectedTime.getMinutes();
     schedule.scheduleAtText = this.schedules.scheduleAtText.getHours() + ":" + this.schedules.scheduleAtText.getMinutes();
   } 
   
   else if (schedule.scheduleAtText != undefined && typeof schedule.scheduleAtText === 'object') {
     let date: Date = schedule.scheduleAtText;
     //var d = date.getHours() * 60 + date.getMinutes();
     schedule.scheduledAt = d;
     schedule.scheduleAtText = date.getHours() + ":" + date.getMinutes();
 }
  
    schedule.tags = strTag;
    schedule.tagNames = tagNames;

    // this.setWeekdays(schedule);
    schedule.intensity = this.globalIntensity;
    schedule.description = schedule.name;

  }

  showErrorMsg(severity: string, message: string) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: message });
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
  }
  // schedules update/edit method   
  update(schedules: Schedules) {
    //  if (!schedules.description) {
    //   schedules.description = schedules.name;
    // }
    this.processSaveOrUpdate(schedules);
    this.scheduleService.updateSchedules(schedules).subscribe(status => {
      this.getSchedules();
      this.displayDialog = false;
      this.showErrorMsg("success", status.message);
      console.log(status);
    },
      error => {
      })
  }

  // schedules cancel method   
  cancel(schedules: Schedules) {
    this.displayDialog = false;
  }

  // schedules delete/remove method
  delete(schedule: Schedules) {
    this.scheduleService.deleteSchedules(schedule).subscribe(status => {
      // this.schedules = status;
      this.getSchedules();
      this.displayDialog = false;
      console.log(status);
      this.showErrorMsg("success", status.message);
    },
      error => {
      })
  }
}
