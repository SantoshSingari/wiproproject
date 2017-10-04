import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule, SelectItem, MultiSelectModule, SliderModule } from 'primeng/primeng';
import { BusyModule } from 'angular2-busy';
import { DeviceService, TagService, UserService, CategoryService } from '../_services/index';
import { ProductService } from '../_services/product.service';
import { Device, Tag, Status, NewTagDevice, Category, Scene } from '../_models/index';
import { Product } from '../_models/index';
import { GlobalEventsManager } from '../GlobalEventsManager';
import { Message } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
@Component({
    moduleId: module.id,
    templateUrl: 'manage.component.html'
})

export class ManageComponent implements OnInit {
    deviceList: Device[];
    products: Product[];
    productList: SelectItem[];
    tagList: Tag[];
    topTagList: Tag[];
    categoryList: SelectItem[] = [];
    activeMode: string;
    filteredTags: any[];
    selectedTags: any[];
    selectedDevices: Device[];
    selectDeviceList: Device[];
    newTagName: string;
    categories: Category[] = [];
    // selectedTags: any;
    dialogVisible: boolean;
    selectedTag: Tag;
    isShowSpinner: boolean = false;
    cars: any[];
    deviceTypeList: SelectItem[];
    floorList: SelectItem[];
    spinnerOpts: any;
    spinner: any;
    msgs: Message[] = [];
    selectedCategory: any = { label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' };
     defualtCategory: any = { label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' };
    status: Status;
    showMenu: boolean = false;
    scene: Scene = new Scene();
    displaySceneDialog: boolean;
    newScene: boolean;
    sliderVal: number;
    scenes: Scene[];
    sceneUids: Array<string> = [];

    constructor(
        private deviceService: DeviceService, private userService: UserService, private categoryService: CategoryService, private productService: ProductService, private tagService: TagService,
        private globalEventsManger: GlobalEventsManager) {
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
            , length: 40 // The length of each line
            , width: 10 // The line thickness
            , radius: 38 // The radius of the inner circle
            , scale: 0.5 // Scales overall size of the spinner
            , corners: 0.8 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.55 // Opacity of the lines
            , rotate: 46 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1.2 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        };



    }

    ngOnInit() {
        this.globalEventsManger.showNavBar(true);
        this.getDevices();
        this.getAllProducts();
        this.getTags();
        this.getCategories();
        this.getScene();
    }

    populateCategoryList(categories: Category[]) {
      this.defualtCategory = { label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' }
        this.categoryList.push(this.defualtCategory);
        if (categories != undefined && categories.length > 0) {
            for (var i = 0;  i< categories.length; i++) {
                let category = categories[i];
                this.categoryList.push({ label: category.name, value: category });
            }
        }

    }
    getCategories() {
        this.categoryService.getAll().subscribe(categories => {
            this.categories = categories;
            this.populateCategoryList(categories)

        })
    }
    unTag(device: Device, tagUid: string) {
        var deviceUids = [];
        deviceUids.push(device.uid);
        this.deviceService.unTagDevice(deviceUids, tagUid).subscribe(status => {
            console.log(status);
            this.getDevices();
        }, error => {
            console.log(error);
        })

    }



    getTagNames(name: string) {
        return name.split(',');
    }

    refreshDevices() {
        this.getDevices();
        this.isShowSpinner = false;
        this.spinner.stop();
    }

    discovery() {
        var target = document.getElementById('discoveryDeviceTable');
        this.isShowSpinner = true;
        // this.spinner = new Spinner(this.spinnerOpts).spin(target);
        this.deviceService.discovery().subscribe(status => {
            if (status != null) {
                //this.deviceService.getAll().subscribe();
                /* setTimeout(()=>{    //<<<---    using ()=> syntax
                     this.refreshDevices();
                 },1000);*/
            } else {
            }
        })
        setTimeout(() => {    //<<<---    using ()=> syntax
            this.refreshDevices();
        }, 45000);
    }

    getTags() {
        this.tagService.getAll().subscribe(tags => {
            this.tagList = tags;
            console.log(this.tagList, "tags");
        }, error => {
            console.log(error);
        })
    }


    addTags() {

        this.dialogVisible = true;
    }


    getAllProducts() {
        this.productService.getAll().subscribe(products => {
            this.products = products;
            console.log(this.products, "products list");
        }, error => {

        });
    }

    getDevices() {
        this.deviceService.getDeviceListWithTags().subscribe(deviceList => {
            //this.deviceService.getDeviceList().subscribe(deviceList => {
            this.deviceList = deviceList;
            console.log(this.deviceList, "getDevices");

        }, error => {
            console.log(error);
        })
    }
    filterTags(event: any) {
        let query: string = event.query;
        this.filteredTags = [];
        for (let i = 0; i < this.tagList.length; i++) {
            let t = this.tagList[i];
            if (t.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                this.filteredTags.push(t);
            }
        }
        let position: number = query.indexOf(",")
        if (position != undefined && position > 0) {
            this.newTagName = query;
         } //else {
        //     this.newTagName = query;
        // }
        return this.filteredTags;
    }


    tagDevice() {
 
        let tagDevice = new NewTagDevice();
        tagDevice.tagNames = [];
        for (let i = 0; i < this.selectedDevices.length; i++) {
            let t = this.selectedDevices[i];
            tagDevice.deviceUids.push(t.uid)
        }
        if (this.selectedTags != undefined) {
            for (let i = 0; i < this.selectedTags.length; i++) {
                let t = this.selectedTags[i];
                if (t.name == undefined) {
                    tagDevice.tagNames.push(t);
                } else {
                    tagDevice.tagNames.push(t.name);
                }
            }
        }

        if (this.newTagName != undefined) {
            let tokens = this.newTagName.split(",");
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].trim().length > 0)
                    tagDevice.tagNames.push(tokens[i].trim());
            }
        }

        this.deviceService.tagDevice(tagDevice).subscribe(status => {
            this.newTagName = "";
            this.selectedTags = [];
            this.selectedDevices = [];
            this.dialogVisible = false;
            this.getTags();
            this.refreshDevices()
            this.filteredTags = [];
        }, error => {
            console.log(error);
        })
         
    }

    updateDevice(device: Device) {
        let category = this.selectedCategory;

        let name = device.name;
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
        this.deviceService.updateDevice(device).subscribe(status => {
            this.showErrorMsg('success', status.message);
        }, error => {
            console.log(error);
        })

    }
    showErrorMsg(severity: string, message: string) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: message });
        setTimeout(() => {
            this.msgs = [];
        }, 2000);
    }


    showSceneDialogToAdd() {
        this.newScene = true;
        this.scene = new Scene();
        this.displaySceneDialog = true;
    }
    onRowSceneSelect(event: any) {
        this.newScene = false;
        this.scene = this.cloneScene(event.data);
        // this.selectedCategory = this.scene.category;
        this.getCategoryFromScene(this.scene.category);

        this.displaySceneDialog = true;
    }

    getCategoryFromScene(categoryName: string) {

        if(this.categoryList == undefined){
            return;
        }
        for(let i =0; i < this.categoryList.length; i++){
          if(this.categoryList[i].label == categoryName){
              this.selectedCategory = this.categoryList[i].value;
        }
    }
    }
    // clone the selected row user data
    cloneScene(s: Scene): Scene {
        let scene = new Scene();
        for (let prop in s) {
            scene[prop] = s[prop];
        }
        return scene;
    }
    // get all the scene from service
    getScene() {
        this.userService.getScenes().subscribe(scenes => {
            //success
            this.scenes = scenes;
            this.showMenu = true;
            console.log(scenes);
        },
            error => {
                console.log(error);
            });

        // this.categoryService.getAll().subscribe(ca)
    }
    
    saveScene(scene: Scene) {
       let category = this.selectedCategory;
        scene.categoryUid = this.selectedCategory.uid;
        
             let name = scene.name;
        let b:boolean = this.checkSceneValidations(scene);  
     if (b) {
      return;
    }
        scene.categoryUid = this.selectedCategory.uid;
        scene.category = this.selectedCategory.name;

          if (scene.category == undefined || scene.category  == "") {
      this.showErrorMsg("error", 'Please enter scene category ');
      return;
    }
        
        this.userService.createScene(scene).subscribe(status => {
            this.status = status;
              //this.showErrorMsg('success', status.message);
              this.getScene();
             this.displaySceneDialog = false;
            console.log(status);
             this.selectedCategory = this.defualtCategory;
            
        },
            error => {
            })
    }
 
    checkSceneValidations(scene: Scene): boolean {
        if (scene.name == undefined || scene.name == "") {
             this.showErrorMsg("error", 'Please enter scene name');
        return true;
        }
 

    }
    
    // scene add/save  method
    cancelScene(scene: Scene) {
        this.displaySceneDialog = false;
    }
    
    // scene update/edit method   
    updateScene(scene: Scene) {
        let name = scene.name;
        let category = this.selectedCategory;

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
              
        this.userService.updateScene(scene).subscribe(status => {
            this.status = status;
            this.selectedCategory = this.defualtCategory;
            this.getScene();
            this.displaySceneDialog = false;
            console.log(status);
        },
            error => {
            })
    }

    // scene delete/remove method
    deleteScene(scene: Scene) {
        this.sceneUids.push(scene.uid)
        this.userService.deleteScene(this.sceneUids).subscribe(status => {
            this.status = status;
            this.getScene();
            this.displaySceneDialog = false;
            console.log(status);
        },
            error => {
            })
    }
}