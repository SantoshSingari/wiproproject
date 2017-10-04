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
var product_service_1 = require("../_services/product.service");
var index_2 = require("../_models/index");
var GlobalEventsManager_1 = require("../GlobalEventsManager");
var ManageComponent = (function () {
    function ManageComponent(deviceService, userService, categoryService, productService, tagService, globalEventsManger) {
        this.deviceService = deviceService;
        this.userService = userService;
        this.categoryService = categoryService;
        this.productService = productService;
        this.tagService = tagService;
        this.globalEventsManger = globalEventsManger;
        this.categoryList = [];
        this.categories = [];
        this.isShowSpinner = false;
        this.msgs = [];
        this.selectedCategory = { label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' };
        this.defualtCategory = { label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' };
        this.showMenu = false;
        this.scene = new index_2.Scene();
        this.sceneUids = [];
        // this.categoryList = [];
        // this.categoryList.push({ label: 'Huddle Room', value: 'Huddle Room' });
        // this.categoryList.push({ label: 'Workstation', value: 'Workstation' });
        // this.categoryList.push({ label: 'Executive Cabin', value: 'Executive Cabins' });
        // this.categoryList.push({ label: 'Conference Room with VC', value: 'Conference Room with VC' });
        // this.categoryList.push({ label: 'Phone Booths/Quiet Rooms', value: 'Phone Booths/Quiet Rooms' });
        // this.categoryList.push({ label: 'Breakout Zones', value: 'Breakout Zones' });
        // this.categoryList.push({ label: 'Corridor', value: 'Corridor' });
        // this.categoryList.push({ label: 'Training Rooms', value: 'Training Rooms' });
        this.activeMode = 'all';
        this.productList = [];
        this.productList.push({ label: 'Wipro lighting', value: 'Wipro lighting' });
        this.productList.push({ label: '2W Round Led DownLighter', value: '2W Round Led DownLighter' });
        this.productList.push({ label: '2W Round Led DownLighter', value: '2W Round Led DownLighter' });
        this.productList.push({ label: '3W Decorative Led Downlighter', value: '3W Decorative Led Downlighter' });
        this.floorList = [];
        this.floorList.push({ label: 'Floor 1', value: 'F1' });
        this.floorList.push({ label: 'Floor 2', value: 'F2' });
        this.floorList.push({ label: 'Floor 3', value: 'F3' });
        this.cars = [
            { vin: 'aa', year: '2000', brand: 'Audi' }
        ];
        this.deviceTypeList = [
            { label: 'Fixtures', value: 'Fixtures' },
            { label: 'Sensors', value: 'Sensors' },
            { label: 'Wall Mounted', value: 'wall' }
        ];
        this.spinnerOpts = {
            lines: 13 // The number of lines to draw
            ,
            length: 40 // The length of each line
            ,
            width: 10 // The line thickness
            ,
            radius: 38 // The radius of the inner circle
            ,
            scale: 0.5 // Scales overall size of the spinner
            ,
            corners: 0.8 // Corner roundness (0..1)
            ,
            color: '#000' // #rgb or #rrggbb or array of colors
            ,
            opacity: 0.55 // Opacity of the lines
            ,
            rotate: 46 // The rotation offset
            ,
            direction: 1 // 1: clockwise, -1: counterclockwise
            ,
            speed: 1.2 // Rounds per second
            ,
            trail: 60 // Afterglow percentage
            ,
            fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            ,
            zIndex: 2e9 // The z-index (defaults to 2000000000)
            ,
            className: 'spinner' // The CSS class to assign to the spinner
            ,
            top: '50%' // Top position relative to parent
            ,
            left: '50%' // Left position relative to parent
            ,
            shadow: false // Whether to render a shadow
            ,
            hwaccel: false // Whether to use hardware acceleration
            ,
            position: 'absolute' // Element positioning
        };
    }
    ManageComponent.prototype.ngOnInit = function () {
        this.globalEventsManger.showNavBar(true);
        this.getDevices();
        this.getAllProducts();
        this.getTags();
        this.getCategories();
        this.getScene();
    };
    ManageComponent.prototype.populateCategoryList = function (categories) {
        this.defualtCategory = { label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' };
        this.categoryList.push(this.defualtCategory);
        if (categories != undefined && categories.length > 0) {
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                this.categoryList.push({ label: category.name, value: category });
            }
        }
    };
    ManageComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getAll().subscribe(function (categories) {
            _this.categories = categories;
            _this.populateCategoryList(categories);
        });
    };
    ManageComponent.prototype.unTag = function (device, tagUid) {
        var _this = this;
        var deviceUids = [];
        deviceUids.push(device.uid);
        this.deviceService.unTagDevice(deviceUids, tagUid).subscribe(function (status) {
            console.log(status);
            _this.getDevices();
        }, function (error) {
            console.log(error);
        });
    };
    ManageComponent.prototype.getTagNames = function (name) {
        return name.split(',');
    };
    ManageComponent.prototype.refreshDevices = function () {
        this.getDevices();
        this.isShowSpinner = false;
        this.spinner.stop();
    };
    ManageComponent.prototype.discovery = function () {
        var _this = this;
        var target = document.getElementById('discoveryDeviceTable');
        this.isShowSpinner = true;
        // this.spinner = new Spinner(this.spinnerOpts).spin(target);
        this.deviceService.discovery().subscribe(function (status) {
            if (status != null) {
                //this.deviceService.getAll().subscribe();
                /* setTimeout(()=>{    //<<<---    using ()=> syntax
                     this.refreshDevices();
                 },1000);*/
            }
            else {
            }
        });
        setTimeout(function () {
            _this.refreshDevices();
        }, 45000);
    };
    ManageComponent.prototype.getTags = function () {
        var _this = this;
        this.tagService.getAll().subscribe(function (tags) {
            _this.tagList = tags;
            console.log(_this.tagList, "tags");
        }, function (error) {
            console.log(error);
        });
    };
    ManageComponent.prototype.addTags = function () {
        this.dialogVisible = true;
    };
    ManageComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.productService.getAll().subscribe(function (products) {
            _this.products = products;
            console.log(_this.products, "products list");
        }, function (error) {
        });
    };
    ManageComponent.prototype.getDevices = function () {
        var _this = this;
        this.deviceService.getDeviceListWithTags().subscribe(function (deviceList) {
            //this.deviceService.getDeviceList().subscribe(deviceList => {
            _this.deviceList = deviceList;
            console.log(_this.deviceList, "getDevices");
        }, function (error) {
            console.log(error);
        });
    };
    ManageComponent.prototype.filterTags = function (event) {
        var query = event.query;
        this.filteredTags = [];
        for (var i = 0; i < this.tagList.length; i++) {
            var t = this.tagList[i];
            if (t.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                this.filteredTags.push(t);
            }
        }
        var position = query.indexOf(",");
        if (position != undefined && position > 0) {
            this.newTagName = query;
        } //else {
        //     this.newTagName = query;
        // }
        return this.filteredTags;
    };
    ManageComponent.prototype.tagDevice = function () {
        var _this = this;
        var tagDevice = new index_2.NewTagDevice();
        tagDevice.tagNames = [];
        for (var i = 0; i < this.selectedDevices.length; i++) {
            var t = this.selectedDevices[i];
            tagDevice.deviceUids.push(t.uid);
        }
        if (this.selectedTags != undefined) {
            for (var i = 0; i < this.selectedTags.length; i++) {
                var t = this.selectedTags[i];
                if (t.name == undefined) {
                    tagDevice.tagNames.push(t);
                }
                else {
                    tagDevice.tagNames.push(t.name);
                }
            }
        }
        if (this.newTagName != undefined) {
            var tokens = this.newTagName.split(",");
            for (var i = 0; i < tokens.length; i++) {
                if (tokens[i].trim().length > 0)
                    tagDevice.tagNames.push(tokens[i].trim());
            }
        }
        this.deviceService.tagDevice(tagDevice).subscribe(function (status) {
            _this.newTagName = "";
            _this.selectedTags = [];
            _this.selectedDevices = [];
            _this.dialogVisible = false;
            _this.getTags();
            _this.refreshDevices();
            _this.filteredTags = [];
        }, function (error) {
            console.log(error);
        });
    };
    ManageComponent.prototype.updateDevice = function (device) {
        var _this = this;
        var category = this.selectedCategory;
        var name = device.name;
        if (name == null || name == undefined) {
            this.showErrorMsg('error', "Please enter name.");
            return;
        }
        // if (category == null || category == undefined || (typeof category === 'string' && category == "SELECT CATEGORY")) {
        //     this.showErrorMsg('error', "Please select category.");
        //     return;
        // }
        if (category != undefined && (typeof category != 'string') && category.label != 'SELECT CATEGORY') {
            device.category = this.selectedCategory.name;
            device.categoryUid = this.selectedCategory.uid;
        }
        console.log(device, "updateDevice");
        this.deviceService.updateDevice(device).subscribe(function (status) {
            _this.showErrorMsg('success', status.message);
        }, function (error) {
            console.log(error);
        });
    };
    ManageComponent.prototype.showErrorMsg = function (severity, message) {
        var _this = this;
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: message });
        setTimeout(function () {
            _this.msgs = [];
        }, 2000);
    };
    ManageComponent.prototype.showSceneDialogToAdd = function () {
        this.newScene = true;
        this.scene = new index_2.Scene();
        this.displaySceneDialog = true;
    };
    ManageComponent.prototype.onRowSceneSelect = function (event) {
        this.newScene = false;
        this.scene = this.cloneScene(event.data);
        // this.selectedCategory = this.scene.category;
        this.getCategoryFromScene(this.scene.category);
        this.displaySceneDialog = true;
    };
    ManageComponent.prototype.getCategoryFromScene = function (categoryName) {
        if (this.categoryList == undefined) {
            return;
        }
        for (var i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].label == categoryName) {
                this.selectedCategory = this.categoryList[i].value;
            }
        }
    };
    // clone the selected row user data
    ManageComponent.prototype.cloneScene = function (s) {
        var scene = new index_2.Scene();
        for (var prop in s) {
            scene[prop] = s[prop];
        }
        return scene;
    };
    // get all the scene from service
    ManageComponent.prototype.getScene = function () {
        var _this = this;
        this.userService.getScenes().subscribe(function (scenes) {
            //success
            _this.scenes = scenes;
            _this.showMenu = true;
            console.log(scenes);
        }, function (error) {
            console.log(error);
        });
        // this.categoryService.getAll().subscribe(ca)
    };
    ManageComponent.prototype.saveScene = function (scene) {
        var _this = this;
        var category = this.selectedCategory;
        scene.categoryUid = this.selectedCategory.uid;
        var name = scene.name;
        var b = this.checkSceneValidations(scene);
        if (b) {
            return;
        }
        scene.categoryUid = this.selectedCategory.uid;
        scene.category = this.selectedCategory.name;
        if (scene.category == undefined || scene.category == "") {
            this.showErrorMsg("error", 'Please enter scene category ');
            return;
        }
        this.userService.createScene(scene).subscribe(function (status) {
            _this.status = status;
            //this.showErrorMsg('success', status.message);
            _this.getScene();
            _this.displaySceneDialog = false;
            console.log(status);
            _this.selectedCategory = _this.defualtCategory;
        }, function (error) {
        });
    };
    ManageComponent.prototype.checkSceneValidations = function (scene) {
        if (scene.name == undefined || scene.name == "") {
            this.showErrorMsg("error", 'Please enter scene name');
            return true;
        }
    };
    // scene add/save  method
    ManageComponent.prototype.cancelScene = function (scene) {
        this.displaySceneDialog = false;
    };
    // scene update/edit method   
    ManageComponent.prototype.updateScene = function (scene) {
        var _this = this;
        var name = scene.name;
        var category = this.selectedCategory;
        if (name == null || name == undefined || name == "") {
            this.showErrorMsg('error', "Please enter scene name");
            return;
        }
        if (category == 'SELECT CATEGORY') {
            this.showErrorMsg('error', "Please select category");
            return;
        }
        scene.category = this.selectedCategory.name;
        scene.categoryUid = this.selectedCategory.uid;
        this.userService.updateScene(scene).subscribe(function (status) {
            _this.status = status;
            _this.selectedCategory = _this.defualtCategory;
            _this.getScene();
            _this.displaySceneDialog = false;
            console.log(status);
        }, function (error) {
        });
    };
    // scene delete/remove method
    ManageComponent.prototype.deleteScene = function (scene) {
        var _this = this;
        this.sceneUids.push(scene.uid);
        this.userService.deleteScene(this.sceneUids).subscribe(function (status) {
            _this.status = status;
            _this.getScene();
            _this.displaySceneDialog = false;
            console.log(status);
        }, function (error) {
        });
    };
    return ManageComponent;
}());
ManageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'manage.component.html'
    }),
    __metadata("design:paramtypes", [index_1.DeviceService, index_1.UserService, index_1.CategoryService, product_service_1.ProductService, index_1.TagService,
        GlobalEventsManager_1.GlobalEventsManager])
], ManageComponent);
exports.ManageComponent = ManageComponent;
//# sourceMappingURL=manage.component.js.map