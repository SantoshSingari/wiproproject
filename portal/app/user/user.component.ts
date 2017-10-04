import { Component, OnInit } from '@angular/core';
import { UserService, CategoryService, DeviceService } from '../_services/index';
import { User, Status, Device, Scene } from '../_models/index';
import { GlobalEventsManager } from '../GlobalEventsManager';
import { SelectItem } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';


@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  users: User[];
  deleteUser: Array<string> = [];
  status: Status;
  showMenu: boolean = false;
  displayUserDialog: boolean;
  //displaySceneDialog: boolean;
  user: User = new User();
  newUser: boolean;
  ///newScene: boolean;
  categoryList: SelectItem[] = [];
  // selectedCategory: string;
// scene: Scene = new Scene();
  sliderVal: number;
  //scenes: Scene[];
  //sceneUids: Array<string> = [];
  msgs: Message[] = [];
  selectedCategory: any;

  constructor(private userService: UserService, private globalEventsManger: GlobalEventsManager, private categoryService: CategoryService, private deviceService: DeviceService) {
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
  ngOnInit() {
    this.globalEventsManger.showNavBar(true);
    this.getAll();
    this.getCategories();
   // this.getScene();

  }
  getCategories() {
    this.categoryService.getAll().subscribe(categoryArray => {
      this.categoryList.push({ label: 'SELECT CATEGORY', value: 'SELECT CATEGORY' });
      if (categoryArray != null && categoryArray != undefined) {
        for (var i = 0; i < categoryArray.length; i++) {
          let category = categoryArray[i];
          this.categoryList.push({ label: category.name, value: category });
        }
      }
    })
  }
  // onclick add button ,show the dialog box
  showDialogToAdd() {
    this.newUser = true;
    this.user = new User();
    this.displayUserDialog = true;
  }



  //onclick row, show the data of the row 
  onRowUserSelect(event: any) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayUserDialog = true;
  }


  // clone the selected row user data
  cloneUser(u: User): User {
    let user = new User();
    for (let prop in u) {
      user[prop] = u[prop];
    }
    return user;
  }
 
  // get all the users from service
  getAll() {
    this.userService.getAll().subscribe(users => {
      //success
      this.users = users;
      this.showMenu = true;
      console.log(users);
    },
      error => {
        console.log(error);
      });

    // this.categoryService.getAll().subscribe(ca)
  }
   
  // user add/save  method
  add(user: User) {
    user.userName = user.firstName;
    let b = this.checkUserValidations(user);
    if (b) {
      return;
    }

    this.userService.createUser(user).subscribe(status => {
      this.status = status;
      this.showErrorMsg('success', status.message);
      this.getAll();
      this.displayUserDialog = false;

    },
      error => {
      })
  }

  checkUserValidations(user: User): boolean {
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
  }
  
  // user add/save  method
  cancel(user: User) {
    this.displayUserDialog = false;
  }

  showErrorMsg(severity: string, message: string) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: message });
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
  }
  
  
  // user update/edit method   
  update(user: User) {
    user.userName = user.firstName;
    let b = this.checkUserValidations(user);
    if (b) {
      return;
    }
    this.userService.updateUser(user).subscribe(status => {
      this.status = status;

      this.showErrorMsg('success', status.message);
      this.getAll();
      this.displayUserDialog = false;

      console.log(status);
    },
      error => {
      })
  }


  // user delete/remove method
  delete(user: User) {
    this.deleteUser.push(user.uid)
    this.userService.deleteUser(this.deleteUser).subscribe(status => {
      this.status = status;
      this.getAll();
      this.displayUserDialog = false;
      console.log(status);
    },
      error => {
      })
  }

 
  handleIntensityChange(event: any, src: Device) {

    if (src.uid == undefined) {
      var curDevice: Device;
      //curDevice = this.getDeviceByUid(src.uid);
      if (event.value == 0) {
        curDevice.status = 0;
        src.status = 0;
      } else {
        curDevice.status = 1;
        src.status = 1;
      }
      if (curDevice.intensity < event.value) {

        this.deviceService.setIntensity(src.uid, event.value).subscribe(status => {
          console.log(status.code, "sats code");
        }, error => {
          console.log(error);
        });
      } else {
        this.deviceService.setIntensity(src.uid, event.value).subscribe(status => {
          console.log(status.code, "sats code");
        }, error => {
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


  }
}


