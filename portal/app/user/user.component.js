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
var UserComponent = (function () {
    function UserComponent(userService, globalEventsManger, categoryService, deviceService) {
        this.userService = userService;
        this.globalEventsManger = globalEventsManger;
        this.categoryService = categoryService;
        this.deviceService = deviceService;
        this.deleteUser = [];
        this.showMenu = false;
        //displaySceneDialog: boolean;
        this.user = new index_2.User();
        ///newScene: boolean;
        this.categoryList = [];
        //scenes: Scene[];
        //sceneUids: Array<string> = [];
        this.msgs = [];
        // this.categoryList = [];
        // this.categoryList.push({ label: 'Select', value: 'Select' });
        // this.categoryList.push({ label: 'Huddle Room', value: 'Huddle Room' });
        // this.categoryList.push({ label: 'Workstation', value: 'Workstation' });
        // this.categoryList.push({ label: 'Executive Cabin', value: 'Executive Cabins' });
        // this.categoryList.push({ label: 'Conference Room with VC', value: 'Conference Room with VC' });
        // this.categoryList.push({ label: 'Phone Booths/Quiet Rooms', value: 'Phone Booths/Quiet Rooms' });
        // this.categoryList.push({ label: 'Breakout Zones', value: 'Breakout Zones' });
        // this.categoryList.push({ label: 'Corridor', value: 'Corridor' });
        // this.categoryList.push({ label: 'Training Rooms', value: 'Training Rooms' });   
    }
    //default loading methods
    UserComponent.prototype.ngOnInit = function () {
        this.globalEventsManger.showNavBar(true);
        this.getAll();
        this.getCategories();
        // this.getScene();
    };
    UserComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (categoryArray) {
            _this.categoryList.push({ label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' });
            if (categoryArray != null && categoryArray != undefined) {
                for (var i = 0; i < categoryArray.length; i++) {
                    var category = categoryArray[i];
                    _this.categoryList.push({ label: category.name, value: category });
                }
            }
        });
    };
    // onclick add button ,show the dialog box
    UserComponent.prototype.showDialogToAdd = function () {
        this.newUser = true;
        this.user = new index_2.User();
        this.displayUserDialog = true;
    };
    //onclick row, show the data of the row 
    UserComponent.prototype.onRowUserSelect = function (event) {
        this.newUser = false;
        this.user = this.cloneUser(event.data);
        this.displayUserDialog = true;
    };
    // clone the selected row user data
    UserComponent.prototype.cloneUser = function (u) {
        var user = new index_2.User();
        for (var prop in u) {
            user[prop] = u[prop];
        }
        return user;
    };
    // get all the users from service
    UserComponent.prototype.getAll = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) {
            //success
            _this.users = users;
            _this.showMenu = true;
            console.log(users);
        }, function (error) {
            console.log(error);
        });
        // this.categoryService.getAll().subscribe(ca)
    };
    // user add/save  method
    UserComponent.prototype.add = function (user) {
        var _this = this;
        user.userName = user.firstName;
        var b = this.checkUserValidations(user);
        if (b) {
            return;
        }
        this.userService.createUser(user).subscribe(function (status) {
            _this.status = status;
            _this.showErrorMsg('success', status.message);
            _this.getAll();
            _this.displayUserDialog = false;
        }, function (error) {
        });
    };
    UserComponent.prototype.checkUserValidations = function (user) {
        if (user.userName == undefined || user.userName == "") {
            this.showErrorMsg("error", 'Please enter username');
            return true;
        }
        if (user.email == undefined || user.email == "") {
            this.showErrorMsg("error", 'Please enter email');
            return true;
        }
        if (user.password == undefined || user.password == "") {
            this.showErrorMsg("error", 'Please enter password');
            return true;
        }
    };
    // user add/save  method
    UserComponent.prototype.cancel = function (user) {
        this.displayUserDialog = false;
    };
    UserComponent.prototype.showErrorMsg = function (severity, message) {
        var _this = this;
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: message });
        setTimeout(function () {
            _this.msgs = [];
        }, 2000);
    };
    // user update/edit method   
    UserComponent.prototype.update = function (user) {
        var _this = this;
        user.userName = user.firstName;
        var b = this.checkUserValidations(user);
        if (b) {
            return;
        }
        this.userService.updateUser(user).subscribe(function (status) {
            _this.status = status;
            _this.showErrorMsg('success', status.message);
            _this.getAll();
            _this.displayUserDialog = false;
            console.log(status);
        }, function (error) {
        });
    };
    // user delete/remove method
    UserComponent.prototype.delete = function (user) {
        var _this = this;
        this.deleteUser.push(user.uid);
        this.userService.deleteUser(this.deleteUser).subscribe(function (status) {
            _this.status = status;
            _this.getAll();
            _this.displayUserDialog = false;
            console.log(status);
        }, function (error) {
        });
    };
    UserComponent.prototype.handleIntensityChange = function (event, src) {
        if (src.uid == undefined) {
            var curDevice;
            //curDevice = this.getDeviceByUid(src.uid);
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
        //    showSceneDialogToAdd() {
        //   this.newScene = true;
        //   this.scene = new Scene();
        //   this.displaySceneDialog = true;
        // }
        // onRowSceneSelect(event: any) {
        //   this.newScene = false;
        //   this.scene = this.cloneScene(event.data);
        //   this.displaySceneDialog = true;
        // }
        // // clone the selected row user data
        // cloneScene(s: Scene): Scene {
        //   let scene = new Scene();
        //   for (let prop in s) {
        //     scene[prop] = s[prop];
        //   }
        //   return scene;
        // }
        // // get all the scene from service
        // getScene() {
        //   this.userService.getScenes().subscribe(scenes => {
        //     //success
        //     this.scenes = scenes;
        //     this.showMenu = true;
        //     console.log(scenes);
        //   },
        //     error => {
        //       console.log(error);
        //     });
        //   // this.categoryService.getAll().subscribe(ca)
        // }
        // saveScene(scene: Scene) {
        //   let category = this.selectedCategory;
        //   let name = scene.name;
        //   if (name == null || name == undefined) {
        //     this.showErrorMsg('error', "Please enter scene name.");
        //     return;
        //   }
        //   if (category == null || category == undefined || typeof category === 'string') {
        //     this.showErrorMsg('error', "Please select category.");
        //     return;
        //   }
        //   scene.categoryUid = this.selectedCategory.uid;
        //   scene.category = this.selectedCategory.name;
        //   this.userService.createScene(scene).subscribe(status => {
        //     this.status = status;
        //     this.displaySceneDialog = false;
        //     console.log(status);
        //     this.getScene();
        //   },
        //     error => {
        //     })
        // }
        // // scene add/save  method
        // cancelScene(scene: Scene) {
        //   this.displaySceneDialog = false;
        // }
        //   // scene update/edit method   
        // updateScene(scene: Scene) {
        //   this.userService.updateScene(scene).subscribe(status => {
        //     this.status = status;
        //     this.getScene();
        //     this.displaySceneDialog = false;
        //     console.log(status);
        //   },
        //     error => {
        //     })
        // }
        // // scene delete/remove method
        // deleteScene(scene: Scene) {
        //   this.sceneUids.push(scene.uid)
        //   this.userService.deleteScene(this.sceneUids).subscribe(status => {
        //     this.status = status;
        //     this.getScene();
        //     this.displaySceneDialog = false;
        //     console.log(status);
        //   },
        //     error => {
        //     })
        // }
        // getDeviceByUid(uid: String): Device {
        //   for (var i = 0; i < this.deviceState.length; i++) {
        //     if (this.deviceState[i].uid == uid) {
        //       return this.deviceState[i];
        //     }
        //   }
        //   return this.globalDevice;
        // }
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService, GlobalEventsManager_1.GlobalEventsManager, index_1.CategoryService, index_1.DeviceService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map