import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SliderModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { TabMenuModule, MenuItem } from 'primeng/primeng';
import { Tag, DeviceStatus, Device, Category } from '../_models/index';
import { TagService, UserService, DashboardService, DeviceService, CategoryService } from '../_services/index';
import { GlobalEventsManager } from '../GlobalEventsManager';

@Component({
  moduleId: module.id,
  templateUrl: 'fixtures.component.html',
  styleUrls: ['style.css']
})
export class FixturesComponent implements OnInit {

  tagList: Tag[];
  deviceStatus: DeviceStatus;
  deviceList: Device[];
  filteredDeviceList: Device[];
  tempFilteredDeviceList: Device[];
  categories: Category[];
  value: boolean = false;
  public edited = false;
  selectedTag: string;
  tag: Tag;
  cols: any[];
  selectedDevice: Device;
  dialogVisible: boolean;
  selectedCategory: string = 'ALL';
  selectedScene1: string;
  selectedSceneForDevice: string = '';
  allTags: Tag[] = [];
  topTagList: Tag[];
  categoryList: SelectItem[] = [];
  deviceDropdownList: SelectItem[];
  sceneList: SelectItem[] = [];
  floorList: SelectItem[];
  tagsList: MenuItem[];
  activeItem: string;
  filteredTags: any[];
  selectedTags: any[] = [];
  activeMode: string;
  activeStatus: number;
  totalIntensity: number;
  globalIntensity: number = 0;
  isGlobalPoweredOn: boolean;
  globalDevice: Device;
  deviceState: Device[];
  opmode: string;
  opNumber: string;
  defaultLimit: any;
  limitTags: Tag[];
  isShowMore: boolean = false;
  fromDashboard: number = 0;
  onCount: number = 0;
  offCount: number = 0;
  nonOpCount: number = 0;
  disableSlider: boolean = false;



  constructor(private tagService: TagService, private dashboardService: DashboardService, private route: ActivatedRoute,
    private deviceService: DeviceService, private categoryService: CategoryService, private globalEventsManger: GlobalEventsManager,
    private userService: UserService) {
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
    this.globalDevice = new Device();

    // this.sceneList = [];
    // this.sceneList.push({ label: 'VC', value: 'VC' });
    // this.sceneList.push({ label: 'Meeting', value: 'Meeting' });

  }

  ngOnInit() {
    this.globalEventsManger.showNavBar(true);

    this.activeMode = this.route.snapshot.params['status'];
    this.activeStatus = parseInt(this.route.snapshot.params['mode']);
    this.fromDashboard = parseInt(this.route.snapshot.params['db']);
    this.getTags();
    this.getDevices();
    this.getCategories();
    this.getScenes();
    this.getDeviceStatus();

  }

  getScenes() {
    this.userService.getScenes().subscribe(scenes => {
      //success
      this.populateSceneList(scenes)
      //console.log(scenes);
    },
      error => {
        //  console.log(error);
      });


  }

  populateSceneList(scenes: any[]) {
    if (scenes != undefined && scenes.length > 0) {
      for (var i = 0; i < scenes.length; i++) {
        let scene = scenes[i];
        this.sceneList.push({ label: scene.name, value: scene.uid });
      }
    }
  }

  onItemChange(anyThing: any) {
    //console.log(anyThing); //Here I want the changed value
  }

  getTags() {
    this.tagService.getAll().subscribe(tags => {
      this.allTags = tags;
      //console.log(this.allTags);
      this.limitTags = [];
      for (let i = 0; i < this.allTags.length; i++) {
        this.limitTags.push(this.allTags[i]);
        if (this.limitTags.length == 5) {
          return;
        }
      }
    }, error => {
      console.log(error);
    })
  }

  filterTags(event: any) {
    let query = event.query;
    this.filteredTags = [];
    for (let i = 0; i < this.allTags.length; i++) {
      let t = this.allTags[i];
      if (t.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.filteredTags.push(t);
      }
    }
    return this.filteredTags;
  }

  onSelectScene(selectedScene: string, device: Device) {

    if (this.selectedCategory != undefined || this.selectedTags != undefined) {

      let tagUids: string[] = [];
      for (let i = 0; i < this.selectedTags.length; i++) {
        let t = this.selectedTags[i];
        tagUids.push(t.uid);
      }

      if (this.selectedCategory == 'ALL') { this.selectedCategory = '*'; }
      this.deviceService.setSceneForTags(this.selectedCategory, selectedScene, tagUids).subscribe(status => {
        console.log(status, "setSceneForTags");

        if (status.code == '200') {
          this.getDevices();
        }

      })
      return;
    }



    this.deviceService.setScene(device, selectedScene).subscribe(status => {
      //console.log(status);

      if (this.selectedTags.length > 0) {
        this.searchByTag("ALL");
      } else if (device != null || device != undefined) {
        for (var i = 0; i < this.filteredDeviceList.length; i++) {
          var d = this.filteredDeviceList[i];
          if (d.uid == device.uid) {
            if (device.status == 1) {
              d.status = 0;
            } else {
              d.status = 1;
            }
          }
        }
        this.refreshSummary();
      } else {
        this.getDevices();
      }

    }, error => {
      console.log(error);
    })
  }


  getDevicesByCategory(category: string) {
    this.deviceService.getByCategory(category).subscribe(data => {
      this.filteredDeviceList = data;
      this.tempFilteredDeviceList = data;
      this.copyDeviceState();
      this.refreshSummary();

    });
  }

  searchByTag(category: string) {
    if (this.selectedTags.length == 0) {

      if (this.selectedCategory.toUpperCase() != 'ALL') {
        this.getDevicesByCategory(this.selectedCategory);
      } else {
        this.getDevices();
      }
      return;
    }
    let tagUids: string[] = [];
    for (let i = 0; i < this.selectedTags.length; i++) {
      let t = this.selectedTags[i];
      tagUids.push(t.uid);
    }
    this.deviceService.getDevicesByTagUids(tagUids, category).subscribe(data => {
      this.filteredDeviceList = data;
      this.tempFilteredDeviceList = data;
      this.copyDeviceState();
      this.refreshSummary();

    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
      this.populateCategoryList(categories)

    })
  }



  populateCategoryList(categories: Category[]) {

    this.categoryList.push({ label: 'All', value: 'All' });
    if (categories != undefined && categories.length > 0) {
      for (var i = 0; i < categories.length; i++) {
        let category = categories[i];
        this.categoryList.push({ label: category.name, value: category.name });

      }
    }

  }

  getDeviceStatus() {
    this.dashboardService.getStatus().subscribe(deviceStatusObj => {
      this.deviceStatus = deviceStatusObj;
      let totalCount = deviceStatusObj.onCount + deviceStatusObj.offCount + deviceStatusObj.nonOpCount;
      if (totalCount == deviceStatusObj.onCount && deviceStatusObj.onCount > 0) {
        this.isGlobalPoweredOn = true;
        // this.globalIntensity = 100;
      } else {
        this.isGlobalPoweredOn = false;
        this.globalIntensity = 0;

      }
      console.log(this.deviceStatus);
    }, error => {
      console.log(error);
    })
  }

  getDevices() {
    this.deviceService.getDeviceList().subscribe(deviceList => {
      this.deviceList = deviceList;
      this.deviceState = [];
      if (this.fromDashboard == 1) {
        this.filteredDeviceList = this.deviceList;
        this.refreshSummary();
        if (this.activeStatus != -1) {
          this.tempFilteredDeviceList = this.filteredDeviceList;
          this.filteredDeviceList = [];
        }
      } else {
        this.filteredDeviceList = this.deviceList;
      }
      this.tempFilteredDeviceList = this.deviceList;
      for (var i = 0; i < this.deviceList.length; i++) {
        var d: Device;
        d = new Device();
        d.intensity = this.deviceList[i].intensity;
        d.ipAddress = this.deviceList[i].ipAddress;
        d.uid = this.deviceList[i].uid;
        d.status = this.deviceList[i].status;
        this.deviceState.push(d);

        let status = this.activeStatus;
        if (this.activeStatus == 2) {
          status = -1;
        } else if (this.activeStatus == -1) {
          status = 3;
        }

        if (this.fromDashboard == 1 && this.deviceList[i].status == status) {
          this.filteredDeviceList.push(this.deviceList[i]);
        }
      }

      if (this.fromDashboard != 1) {
        this.refreshSummary();
      }

    }, error => {
      console.log(error);
    })
  }

  devicePowerToggle(power: boolean, device: Device) {

    this.filteredDeviceList = this.tempFilteredDeviceList;
    let op: number;
    if (power) {
      op = 5;
      if (device.uid != undefined) {
        device.status = 1;
        device.intensity = 100;
        var curDevice: Device;
        curDevice = this.getDeviceByUid(device.uid);
        curDevice.intensity = 100;
        curDevice.status = 1;
        this.globalIntensity = 0;
        this.isGlobalPoweredOn = false;
      } else {
        this.globalIntensity = 100;
        this.isGlobalPoweredOn = true;
        for (var i = 0; i < this.filteredDeviceList.length; i++) {
          this.filteredDeviceList[i].status = 1;
          this.filteredDeviceList[i].intensity = 100;
        }
        this.copyDeviceState();
      }
    } else {
      op = 2;
      if (device.uid != undefined) {
        device.status = 0;
        device.intensity = 0;
        var curDevice: Device;
        curDevice = this.getDeviceByUid(device.uid);
        curDevice.intensity = 0;
        curDevice.status = 0;
      } else {
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

      let tagUids: string[] = [];
      for (let i = 0; i < this.selectedTags.length; i++) {
        let t = this.selectedTags[i];
        tagUids.push(t.uid);
      }

      this.deviceService.powerOpForTag(tagUids, power ? 1 : 0).subscribe(status => {
        console.log(status.code, "sats code");
      }, error => {
        console.log(error);
      });
    } else {
      this.deviceService.powerOp(device.uid, power ? 1 : 0).subscribe(status => {
        console.log(status.code, "sats code");
      }, error => {
        console.log(error);
      });
    }


    this.refreshSummary();

  }

  handleIntensityChange(event: any, src: Device) {

    if (this.disableSlider) {
      this.globalIntensity = event.value;
      return;
    }
    this.disableSlider = true;
     let timeoutId = setTimeout(() => {
      this.disableSlider = false;
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

        let tagUids: string[] = [];
        for (let i = 0; i < this.selectedTags.length; i++) {
          let t = this.selectedTags[i];
          tagUids.push(t.uid);
        }

        this.deviceService.setIntensityForTag(tagUids, event.value).subscribe(status => {
          console.log(status.code, "sats code");
        }, error => {
          console.log(error);
        });
      } else if (this.globalIntensity < event.value) {
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
      this.globalIntensity = event.value;
    } else {
      var curDevice: Device;
      curDevice = this.getDeviceByUid(src.uid);
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

    this.refreshSummary();
  }



  handleIntensityChange2(event: any, src: Device) {
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

        let tagUids: string[] = [];
        for (let i = 0; i < this.selectedTags.length; i++) {
          let t = this.selectedTags[i];
          tagUids.push(t.uid);
        }

        this.deviceService.setIntensityForTag(tagUids, event.value).subscribe(status => {
          console.log(status.code, "sats code");
        }, error => {
          console.log(error);
        });
      } else if (this.globalIntensity < event.value) {
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
      this.globalIntensity = event.value;
    } else {
      var curDevice: Device;
      curDevice = this.getDeviceByUid(src.uid);
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

    this.refreshSummary();


  }

  copyDeviceState() {
    this.deviceState = [];
    for (var i = 0; i < this.filteredDeviceList.length; i++) {
      var d: Device;
      d = new Device();
      d.intensity = this.filteredDeviceList[i].intensity;
      d.ipAddress = this.filteredDeviceList[i].ipAddress;
      d.uid = this.filteredDeviceList[i].uid;
      d.status = this.filteredDeviceList[i].status;
      this.deviceState.push(d);
    }
  }

  getDeviceByUid(uid: String): Device {

    for (var i = 0; i < this.deviceState.length; i++) {
      if (this.deviceState[i].uid == uid) {
        return this.deviceState[i];
      }
    }
    return this.globalDevice;
  }


  getTopTags() {
    this.tagService.getTopTags().subscribe(tags => {
      this.topTagList = tags;
      console.log(this.tagList, "tags");
    }, error => {
      console.log(error);
    })
  }

  refreshSummary() {

    var cntOn = 0;
    var cntOff = 0;
    var cntNoop = 0;
    for (var i = 0; i < this.filteredDeviceList.length; i++) {
      if (this.filteredDeviceList[i].status == 0) {
        cntOff += 1;
      } else if (this.filteredDeviceList[i].status == 1) {
        cntOn += 1;
      } else if (this.filteredDeviceList[i].status == -1) {
        cntNoop += 1;
      }
    }
    if (this.deviceStatus == undefined) {
      this.deviceStatus = new DeviceStatus();
    }

    this.deviceStatus.onCount = cntOn;
    this.deviceStatus.offCount = cntOff;
    this.deviceStatus.nonOpCount = cntNoop;

    let totalCount = cntOn + cntOff + cntNoop;
    if (totalCount == cntOn && cntOn > 0) {
      this.isGlobalPoweredOn = true;
      // this.globalIntensity = 100;
    } else {
      this.isGlobalPoweredOn = false;
      this.globalIntensity = 0;
    }
  }

  setActiveMode(mode: string, status: number) {
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
  }

  filterByTag(tag: Tag) {
    let tagUids: string[] = [];
    tagUids.push(tag.uid);

    this.deviceService.getDevicesByTagUids(tagUids, null).subscribe(data => {
      this.filteredDeviceList = data;
      this.copyDeviceState();
      this.refreshSummary();
    });

  }

  showDevice(device: Device) {
    this.selectedDevice = device;
    this.dialogVisible = true;
  }

  showMore(canShow: boolean) {

    this.isShowMore = canShow;

  }

}