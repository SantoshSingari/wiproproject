"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var index_2 = require("../_models/index");
var GlobalEventsManager_1 = require("../GlobalEventsManager");
var SchedulesComponent = (function () {
    function SchedulesComponent(scheduleService, tagService, globalEventsManger) {
        this.scheduleService = scheduleService;
        this.tagService = tagService;
        this.globalEventsManger = globalEventsManger;
        this.showMenu = true;
        this.msgs = [];
        this.schedules = new index_2.Schedules();
        this.weekdays = [];
        this.selectedweekdays = [];
        this.globalIntensity = 0;
        this.scheduleweekdays = [];
        this.isMonday = false;
        this.isTuesday = false;
        this.isWednesday = false;
        this.isThrusday = false;
        this.isFriday = false;
        this.isSatday = false;
        this.isSunday = false;
    }
    SchedulesComponent.prototype.ngOnInit = function () {
        this.getTags();
        this.getSchedules();
        this.globalEventsManger.showNavBar(true);
        this.tagsList = [];
    };
    SchedulesComponent.prototype.getSchedules = function () {
        var _this = this;
        this.scheduleService.getAll().subscribe(function (schedules) {
            _this.schedulesList = schedules;
            console.log(_this.schedulesList, "schedules");
        });
    };
    SchedulesComponent.prototype.setDay = function (day, b, schedule) {
        if (day == 1) {
            if (b) {
                schedule.monDay = 1;
                this.isMonday = true;
            }
            else {
                schedule.monDay = 0;
                this.isMonday = false;
            }
        }
        if (day == 2) {
            if (b) {
                schedule.tuesDay = 1;
                this.isTuesday = true;
            }
            else {
                schedule.tuesDay = 0;
                this.isTuesday = false;
            }
        }
        if (day == 3) {
            if (b) {
                schedule.wednesDay = 1;
                this.isWednesday = true;
            }
            else {
                schedule.wednesDay = 0;
                this.isWednesday = false;
            }
        }
        if (day == 4) {
            if (b) {
                schedule.thrusDay = 1;
                this.isThrusday = true;
            }
            else {
                schedule.thrusDay = 0;
                this.isThrusday = false;
            }
        }
        if (day == 5) {
            if (b) {
                schedule.friDay = 1;
                this.isFriday = true;
            }
            else {
                schedule.friDay = 0;
                this.isFriday = false;
            }
        }
        if (day == 6) {
            if (b) {
                schedule.satDay = 1;
                this.isSatday = true;
            }
            else {
                schedule.satDay = 0;
                this.isSatday = false;
            }
        }
        if (day == 7) {
            if (b) {
                schedule.sunDay = 1;
                this.isSunday = true;
            }
            else {
                schedule.sunDay = 0;
                this.isSunday = false;
            }
        }
    };
    SchedulesComponent.prototype.populateSchedulesData = function (schedule) {
        if (schedule != null && schedule != undefined) {
            this.globalIntensity = schedule.intensity;
            var tags = schedule.tags;
            if (tags != null && tags != undefined) {
                var tagUids = tags.split(",");
                if (tagUids.length > 0) {
                    if (this.tagList != undefined && this.tagList.length > 0) {
                        this.selectedTags = [];
                        for (var i = 0; i < tagUids.length; i++) {
                            var tagUid = tagUids[i];
                            for (var j = 0; j < this.tagList.length; j++) {
                                var tag = this.tagList[j];
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
    };
    SchedulesComponent.prototype.devicePowerToggle = function (checked) {
        if (checked == true) {
            this.globalIntensity = 100;
        }
        else {
            this.globalIntensity = 0;
        }
    };
    SchedulesComponent.prototype.getTags = function () {
        var _this = this;
        this.tagService.getAll().subscribe(function (tags) {
            _this.tagList = tags;
            console.log(_this.tagList);
        }, function (error) {
            console.log(error);
        });
    };
    SchedulesComponent.prototype.showDialogToAdd = function () {
        this.newSchedules = true;
        this.schedules = new index_2.Schedules();
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
    };
    SchedulesComponent.prototype.onRowSelect = function (event) {
        this.newSchedules = false;
        this.schedules = this.cloneSchedules(event.data);
        this.populateSchedulesData(this.schedules);
        this.displayDialog = true;
    };
    SchedulesComponent.prototype.cloneSchedules = function (s) {
        var schedules = new index_2.Schedules();
        for (var prop in s) {
            schedules[prop] = s[prop];
        }
        return schedules;
    };
    SchedulesComponent.prototype.filterTags = function (event) {
        var query = event.query;
        this.filteredTags = [];
        for (var i = 0; i < this.tagList.length; i++) {
            var t = this.tagList[i];
            if (t.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                this.filteredTags.push(t);
            }
        }
        return this.filteredTags;
    };
    SchedulesComponent.prototype.getCondition = function (sch, b) {
        var weekday = new Array();
        var week = "";
        if (sch.monDay) {
            week += " Mon ";
        }
        if (sch.tuesDay) {
            week += " Tue ";
        }
        if (sch.wednesDay) {
            week += " Wed ";
        }
        if (sch.thrusDay) {
            week += " Thu ";
        }
        if (sch.friDay) {
            week += " Fri ";
        }
        if (sch.satDay) {
            week += " Sat ";
        }
        if (sch.sunDay) {
            week += " Sun ";
        }
        return "Runs " + sch.tagNames + " on " + week + " at time " + sch.scheduleAtText;
    };
    SchedulesComponent.prototype.addSchedules = function (schedule) {
        var _this = this;
        this.processSaveOrUpdate(schedule);
        this.scheduleService.createSchedules(schedule).subscribe(function (status) {
            _this.getSchedules();
            _this.displayDialog = false;
            _this.filteredTags = [];
            _this.showErrorMsg("success", status.message);
        }, function (error) {
        });
    };
    SchedulesComponent.prototype.processSaveOrUpdate = function (schedule) {
        var strTag = "";
        var tagNames = "";
        if (this.selectedTags != undefined) {
            for (var i = 0; i < this.selectedTags.length; i++) {
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
            var date = schedule.scheduleAtText;
            //var d = date.getHours() * 60 + date.getMinutes();
            schedule.scheduledAt = d;
            schedule.scheduleAtText = date.getHours() + ":" + date.getMinutes();
        }
        schedule.tags = strTag;
        schedule.tagNames = tagNames;
        // this.setWeekdays(schedule);
        schedule.intensity = this.globalIntensity;
        schedule.description = schedule.name;
    };
    SchedulesComponent.prototype.showErrorMsg = function (severity, message) {
        var _this = this;
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: message });
        setTimeout(function () {
            _this.msgs = [];
        }, 2000);
    };
    // schedules update/edit method   
    SchedulesComponent.prototype.update = function (schedules) {
        var _this = this;
        //  if (!schedules.description) {
        //   schedules.description = schedules.name;
        // }
        this.processSaveOrUpdate(schedules);
        this.scheduleService.updateSchedules(schedules).subscribe(function (status) {
            _this.getSchedules();
            _this.displayDialog = false;
            _this.showErrorMsg("success", status.message);
            console.log(status);
        }, function (error) {
        });
    };
    // schedules cancel method   
    SchedulesComponent.prototype.cancel = function (schedules) {
        this.displayDialog = false;
    };
    // schedules delete/remove method
    SchedulesComponent.prototype.delete = function (schedule) {
        var _this = this;
        this.scheduleService.deleteSchedules(schedule).subscribe(function (status) {
            // this.schedules = status;
            _this.getSchedules();
            _this.displayDialog = false;
            console.log(status);
            _this.showErrorMsg("success", status.message);
        }, function (error) {
        });
    };
    return SchedulesComponent;
}());
SchedulesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'schedules.component.html'
    }),
    __metadata("design:paramtypes", [index_1.SchedulesService, index_1.TagService,
        GlobalEventsManager_1.GlobalEventsManager])
], SchedulesComponent);
exports.SchedulesComponent = SchedulesComponent;
//# sourceMappingURL=schedules.component.js.map