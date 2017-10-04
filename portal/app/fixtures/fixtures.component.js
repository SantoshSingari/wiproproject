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
var router_1 = require("@angular/router");
var index_1 = require("../_models/index");
var index_2 = require("../_services/index");
var GlobalEventsManager_1 = require("../GlobalEventsManager");
var FixturesComponent = (function () {
    function FixturesComponent(tagService, dashboardService, route, deviceService, categoryService, globalEventsManger, userService) {
        this.tagService = tagService;
        this.dashboardService = dashboardService;
        this.route = route;
        this.deviceService = deviceService;
        this.categoryService = categoryService;
        this.globalEventsManger = globalEventsManger;
        this.userService = userService;
        this.value = false;
        this.edited = false;
        this.selectedCategory = 'ALL';
        this.selectedSceneForDevice = '';
        this.allTags = [];
        this.categoryList = [];
        this.sceneList = [];
        this.selectedTags = [];
        this.globalIntensity = 0;
        this.isShowMore = false;
        this.fromDashboard = 0;
        this.onCount = 0;
        this.offCount = 0;
        this.nonOpCount = 0;
        this.disableSlider = false;
        this.deviceDropdownList = [];
        // this.categoryList = [];
        // this.categoryList.push({ label: 'All', value: 'All' });
        // this.categoryList.push({ label: 'Huddle Room', value: 'Huddle Room' });
        // this.categoryList.push({ label: 'Workstation', value: 'Workstation' });
        // this.categoryList.push({ label: 'Executive Cabin', value: 'Executive Cabins' });
        // this.categoryList.push({ label: 'Conference Room with VC', value: 'Conference Room with VC' });
        // this.categoryList.push({ label: 'Phone Booths/Quiet Rooms', value: 'Phone Booths/Quiet Rooms' });
        // this.categoryList.push({ label: 'Breakout Zones', value: 'Breakout Zones' });
        // this.categoryList.push({ label: 'Corridor', value: 'Corridor' });
        // this.categoryList.push({ label: 'Training Rooms', value: 'Training Rooms' });
        this.activeMode = 'all';
        this.floorList = [];
        this.floorList.push({ label: 'Floor 1', value: 'F1' });
        this.floorList.push({ label: 'Floor 2', value: 'F2' });
        this.floorList.push({ label: 'Floor 3', value: 'F3' });
        this.isGlobalPoweredOn = false;
        this.globalDevice = new index_1.Device();
        // this.sceneList = [];
        // this.sceneList.push({ label: 'VC', value: 'VC' });
        // this.sceneList.push({ label: 'Meeting', value: 'Meeting' });
    }
    FixturesComponent.prototype.ngOnInit = function () {
        this.globalEventsManger.showNavBar(true);
        this.activeMode = this.route.snapshot.params['status'];
        this.activeStatus = parseInt(this.route.snapshot.params['mode']);
        this.fromDashboard = parseInt(this.route.snapshot.params['db']);
        this.getTags();
        this.getDevices();
        this.getCategories();
        this.getScenes();
        this.getDeviceStatus();
    };
    FixturesComponent.prototype.getScenes = function () {
        var _this = this;
        this.userService.getScenes().subscribe(function (scenes) {
            //success
            _this.populateSceneList(scenes);
            //console.log(scenes);
        }, function (error) {
            //  console.log(error);
        });
    };
    FixturesComponent.prototype.populateSceneList = function (scenes) {
        if (scenes != undefined && scenes.length > 0) {
            for (var i = 0; i < scenes.length; i++) {
                var scene = scenes[i];
                this.sceneList.push({ label: scene.name, value: scene.uid });
            }
        }
    };
    FixturesComponent.prototype.onItemChange = function (anyThing) {
        //console.log(anyThing); //Here I want the changed value
    };
    FixturesComponent.prototype.getTags = function () {
        var _this = this;
        this.tagService.getAll().subscribe(function (tags) {
            _this.allTags = tags;
            //console.log(this.allTags);
            _this.limitTags = [];
            for (var i = 0; i < _this.allTags.length; i++) {
                _this.limitTags.push(_this.allTags[i]);
                if (_this.limitTags.length == 5) {
                    return;
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    FixturesComponent.prototype.filterTags = function (event) {
        var query = event.query;
        this.filteredTags = [];
        for (var i = 0; i < this.allTags.length; i++) {
            var t = this.allTags[i];
            if (t.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                this.filteredTags.push(t);
            }
        }
        return this.filteredTags;
    };
    FixturesComponent.prototype.onSelectScene = function (selectedScene, device) {
        var _this = this;
        if (this.selectedCategory != undefined || this.selectedTags != undefined) {
            var tagUids = [];
            for (var i = 0; i < this.selectedTags.length; i++) {
                var t = this.selectedTags[i];
                tagUids.push(t.uid);
            }
            if (this.selectedCategory == 'ALL') {
                this.selectedCategory = '*';
            }
            this.deviceService.setSceneForTags(this.selectedCategory, selectedScene, tagUids).subscribe(function (status) {
                console.log(status, "setSceneForTags");
                if (status.code == '200') {
                    _this.getDevices();
                }
            });
            return;
        }
        this.deviceService.setScene(device, selectedScene).subscribe(function (status) {
            //console.log(status);
            if (_this.selectedTags.length > 0) {
                _this.searchByTag("ALL");
            }
            else if (device != null || device != undefined) {
                for (var i = 0; i < _this.filteredDeviceList.length; i++) {
                    var d = _this.filteredDeviceList[i];
                    if (d.uid == device.uid) {
                        if (device.status == 1) {
                            d.status = 0;
                        }
                        else {
                            d.status = 1;
                        }
                    }
                }
                _this.refreshSummary();
            }
            else {
                _this.getDevices();
            }
        }, function (error) {
            console.log(error);
        });
    };
    FixturesComponent.prototype.getDevicesByCategory = function (category) {
        var _this = this;
        this.deviceService.getByCategory(category).subscribe(function (data) {
            _this.filteredDeviceList = data;
            _this.tempFilteredDeviceList = data;
            _this.copyDeviceState();
            _this.refreshSummary();
        });
    };
    FixturesComponent.prototype.searchByTag = function (category) {
        var _this = this;
        if (this.selectedTags.length == 0) {
            if (this.selectedCategory.toUpperCase() != 'ALL') {
                this.getDevicesByCategory(this.selectedCategory);
            }
            else {
                this.getDevices();
            }
            return;
        }
        var tagUids = [];
        for (var i = 0; i < this.selectedTags.length; i++) {
            var t = this.selectedTags[i];
            tagUids.push(t.uid);
        }
        this.deviceService.getDevicesByTagUids(tagUids, category).subscribe(function (data) {
            _this.filteredDeviceList = data;
            _this.tempFilteredDeviceList = data;
            _this.copyDeviceState();
            _this.refreshSummary();
        });
    };
    FixturesComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (categories) {
            _this.categories = categories;
            _this.populateCategoryList(categories);
        });
    };
    FixturesComponent.prototype.populateCategoryList = function (categories) {
        this.categoryList.push({ label: 'All', value: 'All' });
        if (categories != undefined && categories.length > 0) {
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                this.categoryList.push({ label: category.name, value: category.name });
            }
        }
    };
    FixturesComponent.prototype.getDeviceStatus = function () {
        var _this = this;
        this.dashboardService.getStatus().subscribe(function (deviceStatusObj) {
            _this.deviceStatus = deviceStatusObj;
            var totalCount = deviceStatusObj.onCount + deviceStatusObj.offCount + deviceStatusObj.nonOpCount;
            if (totalCount == deviceStatusObj.onCount && deviceStatusObj.onCount > 0) {
                _this.isGlobalPoweredOn = true;
                // this.globalIntensity = 100;
            }
            else {
                _this.isGlobalPoweredOn = false;
                _this.globalIntensity = 0;
            }
            console.log(_this.deviceStatus);
        }, function (error) {
            console.log(error);
        });
    };
    FixturesComponent.prototype.getDevices = function () {
        var _this = this;
        this.deviceService.getDeviceList().subscribe(function (deviceList) {
            _this.deviceList = deviceList;
            _this.deviceState = [];
            if (_this.fromDashboard == 1) {
                _this.filteredDeviceList = _this.deviceList;
                _this.refreshSummary();
                if (_this.activeStatus != -1) {
                    _this.tempFilteredDeviceList = _this.filteredDeviceList;
                    _this.filteredDeviceList = [];
                }
            }
            else {
                _this.filteredDeviceList = _this.deviceList;
            }
            _this.tempFilteredDeviceList = _this.deviceList;
            for (var i = 0; i < _this.deviceList.length; i++) {
                var d;
                d = new index_1.Device();
                d.intensity = _this.deviceList[i].intensity;
                d.ipAddress = _this.deviceList[i].ipAddress;
                d.uid = _this.deviceList[i].uid;
                d.status = _this.deviceList[i].status;
                _this.deviceState.push(d);
                var status_1 = _this.activeStatus;
                if (_this.activeStatus == 2) {
                    status_1 = -1;
                }
                else if (_this.activeStatus == -1) {
                    status_1 = 3;
                }
                if (_this.fromDashboard == 1 && _this.deviceList[i].status == status_1) {
                    _this.filteredDeviceList.push(_this.deviceList[i]);
                }
            }
            if (_this.fromDashboard != 1) {
                _this.refreshSummary();
            }
        }, function (error) {
            console.log(error);
        });
    };
    FixturesComponent.prototype.devicePowerToggle = function (power, device) {
        this.filteredDeviceList = this.tempFilteredDeviceList;
        var op;
        if (power) {
            op = 5;
            if (device.uid != undefined) {
                device.status = 1;
                device.intensity = 100;
                var curDevice;
                curDevice = this.getDeviceByUid(device.uid);
                curDevice.intensity = 100;
                curDevice.status = 1;
                this.globalIntensity = 0;
                this.isGlobalPoweredOn = false;
            }
            else {
                this.globalIntensity = 100;
                this.isGlobalPoweredOn = true;
                for (var i = 0; i < this.filteredDeviceList.length; i++) {
                    this.filteredDeviceList[i].status = 1;
                    this.filteredDeviceList[i].intensity = 100;
                }
                this.copyDeviceState();
            }
        }
        else {
            op = 2;
            if (device.uid != undefined) {
                device.status = 0;
                device.intensity = 0;
                var curDevice;
                curDevice = this.getDeviceByUid(device.uid);
                curDevice.intensity = 0;
                curDevice.status = 0;
            }
            else {
                this.globalIntensity = 0;
                this.isGlobalPoweredOn = false;
                for (var i = 0; i < this.filteredDeviceList.length; i++) {
                    this.filteredDeviceList[i].status = 0;
                    this.filteredDeviceList[i].intensity = 0;
                }
                this.copyDeviceState();
            }
        }
        if (this.selectedTags.length > 0) {
            var tagUids = [];
            for (var i_1 = 0; i_1 < this.selectedTags.length; i_1++) {
                var t = this.selectedTags[i_1];
                tagUids.push(t.uid);
            }
            this.deviceService.powerOpForTag(tagUids, power ? 1 : 0).subscribe(function (status) {
                console.log(status.code, "sats code");
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.deviceService.powerOp(device.uid, power ? 1 : 0).subscribe(function (status) {
                console.log(status.code, "sats code");
            }, function (error) {
                console.log(error);
            });
        }
        this.refreshSummary();
    };
    FixturesComponent.prototype.handleIntensityChange = function (event, src) {
        var _this = this;
        if (this.disableSlider) {
            this.globalIntensity = event.value;
            return;
        }
        this.disableSlider = true;
        var timeoutId = setTimeout(function () {
            _this.disableSlider = false;
        }, 1000);
        this.filteredDeviceList = this.tempFilteredDeviceList;
        if (src.uid == undefined) {
            if (event.value > 0) {
                this.isGlobalPoweredOn = true;
                this.globalIntensity = event.value;
            }
            if (event.value == 0) {
                this.isGlobalPoweredOn = false;
            }
            for (var i = 0; i < this.filteredDeviceList.length; i++) {
                this.filteredDeviceList[i].intensity = event.value;
                if (event.value > 0) {
                    this.filteredDeviceList[i].status = 1;
                }
            }
            if (event.value == 0) {
                this.devicePowerToggle(false, this.globalDevice);
                return;
            }
            this.copyDeviceState();
            if (this.selectedTags.length > 0) {
                var tagUids = [];
                for (var i_2 = 0; i_2 < this.selectedTags.length; i_2++) {
                    var t = this.selectedTags[i_2];
                    tagUids.push(t.uid);
                }
                this.deviceService.setIntensityForTag(tagUids, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            else if (this.globalIntensity < event.value) {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            this.globalIntensity = event.value;
        }
        else {
            var curDevice;
            curDevice = this.getDeviceByUid(src.uid);
            if (event.value == 0) {
                curDevice.status = 0;
                src.status = 0;
            }
            else {
                curDevice.status = 1;
                src.status = 1;
            }
            if (curDevice.intensity < event.value) {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            curDevice.intensity = event.value;
        }
        this.refreshSummary();
    };
    FixturesComponent.prototype.handleIntensityChange2 = function (event, src) {
        this.filteredDeviceList = this.tempFilteredDeviceList;
        if (src.uid == undefined) {
            if (event.value > 0) {
                this.isGlobalPoweredOn = true;
                this.globalIntensity = event.value;
            }
            if (event.value == 0) {
                this.isGlobalPoweredOn = false;
            }
            for (var i = 0; i < this.filteredDeviceList.length; i++) {
                this.filteredDeviceList[i].intensity = event.value;
                if (event.value > 0) {
                    this.filteredDeviceList[i].status = 1;
                }
            }
            if (event.value == 0) {
                this.devicePowerToggle(false, this.globalDevice);
                return;
            }
            this.copyDeviceState();
            if (this.selectedTags.length > 0) {
                var tagUids = [];
                for (var i_3 = 0; i_3 < this.selectedTags.length; i_3++) {
                    var t = this.selectedTags[i_3];
                    tagUids.push(t.uid);
                }
                this.deviceService.setIntensityForTag(tagUids, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            else if (this.globalIntensity < event.value) {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            this.globalIntensity = event.value;
        }
        else {
            var curDevice;
            curDevice = this.getDeviceByUid(src.uid);
            if (event.value == 0) {
                curDevice.status = 0;
                src.status = 0;
            }
            else {
                curDevice.status = 1;
                src.status = 1;
            }
            if (curDevice.intensity < event.value) {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                this.deviceService.setIntensity(src.uid, event.value).subscribe(function (status) {
                    console.log(status.code, "sats code");
                }, function (error) {
                    console.log(error);
                });
            }
            curDevice.intensity = event.value;
        }
        this.refreshSummary();
    };
    FixturesComponent.prototype.copyDeviceState = function () {
        this.deviceState = [];
        for (var i = 0; i < this.filteredDeviceList.length; i++) {
            var d;
            d = new index_1.Device();
            d.intensity = this.filteredDeviceList[i].intensity;
            d.ipAddress = this.filteredDeviceList[i].ipAddress;
            d.uid = this.filteredDeviceList[i].uid;
            d.status = this.filteredDeviceList[i].status;
            this.deviceState.push(d);
        }
    };
    FixturesComponent.prototype.getDeviceByUid = function (uid) {
        for (var i = 0; i < this.deviceState.length; i++) {
            if (this.deviceState[i].uid == uid) {
                return this.deviceState[i];
            }
        }
        return this.globalDevice;
    };
    FixturesComponent.prototype.getTopTags = function () {
        var _this = this;
        this.tagService.getTopTags().subscribe(function (tags) {
            _this.topTagList = tags;
            console.log(_this.tagList, "tags");
        }, function (error) {
            console.log(error);
        });
    };
    FixturesComponent.prototype.refreshSummary = function () {
        var cntOn = 0;
        var cntOff = 0;
        var cntNoop = 0;
        for (var i = 0; i < this.filteredDeviceList.length; i++) {
            if (this.filteredDeviceList[i].status == 0) {
                cntOff += 1;
            }
            else if (this.filteredDeviceList[i].status == 1) {
                cntOn += 1;
            }
            else if (this.filteredDeviceList[i].status == -1) {
                cntNoop += 1;
            }
        }
        if (this.deviceStatus == undefined) {
            this.deviceStatus = new index_1.DeviceStatus();
        }
        this.deviceStatus.onCount = cntOn;
        this.deviceStatus.offCount = cntOff;
        this.deviceStatus.nonOpCount = cntNoop;
        var totalCount = cntOn + cntOff + cntNoop;
        if (totalCount == cntOn && cntOn > 0) {
            this.isGlobalPoweredOn = true;
            // this.globalIntensity = 100;
        }
        else {
            this.isGlobalPoweredOn = false;
            this.globalIntensity = 0;
        }
    };
    FixturesComponent.prototype.setActiveMode = function (mode, status) {
        this.activeStatus = status;
        this.activeMode = mode;
        if (status == -1 || this.deviceList == undefined) {
            this.filteredDeviceList = this.deviceList;
            return;
        }
        if (status == 2) {
            status = -1;
        }
        this.filteredDeviceList = [];
        this.fromDashboard = -1;
        for (var i = 0; i < this.deviceList.length; i++) {
            if (this.deviceList[i].status == status) {
                this.filteredDeviceList.push(this.deviceList[i]);
            }
        }
    };
    FixturesComponent.prototype.filterByTag = function (tag) {
        var _this = this;
        var tagUids = [];
        tagUids.push(tag.uid);
        this.deviceService.getDevicesByTagUids(tagUids, null).subscribe(function (data) {
            _this.filteredDeviceList = data;
            _this.copyDeviceState();
            _this.refreshSummary();
        });
    };
    FixturesComponent.prototype.showDevice = function (device) {
        this.selectedDevice = device;
        this.dialogVisible = true;
    };
    FixturesComponent.prototype.showMore = function (canShow) {
        this.isShowMore = canShow;
    };
    return FixturesComponent;
}());
FixturesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'fixtures.component.html',
        styleUrls: ['style.css']
    }),
    __metadata("design:paramtypes", [index_2.TagService, index_2.DashboardService, router_1.ActivatedRoute,
        index_2.DeviceService, index_2.CategoryService, GlobalEventsManager_1.GlobalEventsManager,
        index_2.UserService])
], FixturesComponent);
exports.FixturesComponent = FixturesComponent;
//# sourceMappingURL=fixtures.component.js.map