import {Observable} from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectItem} from 'primeng/primeng';
import {ChartModule, UIChart} from 'primeng/primeng';
import { DashboardService,DeviceService } from '../_services/index';
import { DevicesStats, DeviceStatus ,Device,TotalWattage} from '../_models/index';
import {GlobalEventsManager} from '../GlobalEventsManager';

@Component({
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {

  private deviceEnergyStats: DevicesStats[];
  private deviceEnergyChart:DevicesStats[];
  durationList: SelectItem[];
  floorList: SelectItem[];
  selectedFloor:string;
  selectedDuration:string;
  selectedLabel:string; //sk
  @ViewChild("chart")  chart: UIChart;

  categorywiseEnergyConsumptionData: any;
  illumainanceData:any;
  energyConsumptionData: any;
  pieChartOptions: any;
  isShowDropdown1:any;
  deviceStats: DevicesStats;
  totalWattage:TotalWattage = new TotalWattage();
  deviceList: Device[];
  filteredDeviceList: Device[];
  deviceState: Device[];
  deviceDropdownList: SelectItem[];
  activeStatus:number;
  activeMode:string;
  deviceStatus: DeviceStatus;
  noOfTrees:number;
  co2reduced:number = 0;
 
  constructor(private dashboardService: DashboardService, private globalEventsManger: GlobalEventsManager,private deviceService:DeviceService) {

      this.durationList = [];
      this.durationList.push({label:'By Day',value:'d'});
      this.durationList.push({label:'Last 24 hours',value:'h'});
      this.durationList.push({label:'Real Time in Minutes',value:'realtime'});
      this.activeMode = 'all';
      this.floorList = [];
      this.floorList.push({label:'Floor 1',value:'F1'});
      this.floorList.push({label:'Floor 2',value:'F2'});
      this.floorList.push({label:'Floor 3',value:'F3'});

      Observable.interval(10000).subscribe(x => {
        if(this.selectedDuration=='realtime'){
          this.refreshChart();
        }
      })


      this.illumainanceData = {
            labels: ['People','Focus','Engage', 'Collabaration', 'Social'],
            datasets: [
                {
                    data: [350, 350, 450, 500, 200],
                    backgroundColor: [
                        "#746a60",
                        "#74d0d0",
                        "#f6cb28",
                        "#839098",
                        "#f67945",
                      
                    ],
                    hoverBackgroundColor: [
                        "#746a60",
                        "#74d0d0",
                        "#f6cb28",
                        "#839098",
                        "#f67945",
                        
                    ]
                }]    
      }


      this.energyConsumptionData = {
          labels: [],
          datasets:[{
                    label: 'Watts',
                    //data: [65, 59, 80, 81, 56, 55, 40],
                    //fill: true,
                    borderColor: '#4bc0c0'
                    //backgroundColor: '#4bc0c0'
                  }
                ],
      }

      // this.lineChartOptions = {
      //     title: {
      //             display: false,
      //             text: 'Energy Consumption trend',
      //             fontSize: 16
      //             position: 'bottom'
      //       },
      //     legend: {
      //             display:true,
      //             position: 'top'
      //       }
      // }

      this.categorywiseEnergyConsumptionData = {
            labels: ['People','Focus','Engage', 'Collabaration', 'Social'],
            datasets: [
                {
                    data: [40, 20, 15, 15, 10],
                    backgroundColor: [
                        "#746a60",
                        "#74d0d0",
                        "#f6cb28",
                        "#839098",
                        "#f67945",
                    ],

                    hoverBackgroundColor: [
                        "#746a60",
                        "#74d0d0",
                        "#f6cb28",
                        "#839098",
                        "#f67945",
                    ]
                }]    
      }

      this.pieChartOptions = {
            title: {
                display: false,
                text: 'My Title',
                fontSize: 16
            },
            legend: {
                display:false,
                position: 'right'
            }
      }

}

  ngOnInit() {
     this.getTotalWattage();
    //  this.trees();
    this.globalEventsManger.showNavBar(true);
    this.selectedDuration ='d';
    this.selectedLabel = this.getLabel(this.selectedDuration);
    this.reloadChart(this.chart);
    this.getDeviceStatistics();
  }

  getDeviceStatus() {
    this.dashboardService.getStatus().subscribe(deviceStatusObj => {
      this.deviceStatus = deviceStatusObj;
      console.log(this.deviceStatus);
    }, error => {
      console.log(error);
    })
  }

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  
  getEnergyConsumption(param: string) {
    this.dashboardService.energyConsumption(param).subscribe(data => {
      this.deviceEnergyStats = data;
      this.createChart(this.deviceEnergyStats);
    },
     error => {
      });
   }

   showDrop1(){
     this.isShowDropdown1 = true;
   }

  refreshChart(){
    if(this.selectedDuration=='realtime'){
      this.refreshEnergyConsumption(this.selectedDuration);
    }

  }

  getDeviceStatistics() {
    this.dashboardService.getDeviceStatistics().subscribe(data => {
      this.deviceStats = data;
    },
     error => {
      });
  }

getTotalWattage() {
    this.dashboardService.getWattage().subscribe(data => {
      this.totalWattage = data;
     this.noOfTrees =  (( this.totalWattage.energySavings/1000) * 0.0005925)*0.5;
     this.co2reduced = (this.totalWattage.energySavings/1000 )* 0.0005925 * 1000;
     if(this.noOfTrees > 0 || this.noOfTrees < 1){
       this.noOfTrees = 1;
     }

     this.co2reduced = Math.ceil(this.co2reduced); 
    },
     error => {
      });
  }
  trees(tw:TotalWattage){
    return " "+ (tw.energySavings * 0.92 * 0.5) / 1000  + " "; 
  }

  reloadChart(chart: UIChart){
    this.refreshEnergyConsumption(this.selectedDuration);
    this.selectedLabel = this.getLabel(this.selectedDuration);
  }

  

  //random chart start

  // randomChart(chart: UIChart){
  //  this.autoChangeChart(this.selectedDuration);
  // }
  // autoChangeChart(duration:duration){
  //   this.dashboardService.randomChart(duration).subscribe(data =>{
  //     this.deviceEnergyChart = data;
  //       (function(){setTimeout(() => {
  //                   this.createChart(this.deviceEnergyChart);
  //               }, 30000);
  //           })();
      
  //   })
  // }

   //random chart end

  refreshEnergyConsumption(param: string) {
    this.selectedDuration = param;
    //this.selectedLabel = getLabel(this.selectedDuration);
    this.dashboardService.energyConsumption(param).subscribe(data => {
      this.deviceEnergyStats = data;
       this.createChart(this.deviceEnergyStats);
    },
     error => {
      });
  }

    checkVal(param: string){
      if(param == undefined || param == null ){
        return "--";
      }
      return param;
    }

    calcTreeCount(){
       if(this.deviceStats.energyConsumed == undefined || this.deviceStats.energyConsumed==0){
         return 0;
       }else{
         return this.deviceStats.energyConsumed*10;//replace this valid formula
       }
    }

    calcEmission(){
       if(this.deviceStats.energyConsumed == undefined || this.deviceStats.energyConsumed==0){
         return 0;
       }else{
         return this.deviceStats.energyConsumed*20;//replace this valid formula
       }
    }

    getTotal(param: DeviceStatus){
      var total = 0;
      if(param.onCount != undefined ){
        total = param.onCount;
      }
      if(param.offCount != undefined ){
        total = total+param.offCount;
      }
      if(param.nonOpCount != undefined ){
        total = total+param.nonOpCount;
      }
      return total;
    }
  
  public createChart(deviceStats: DevicesStats[]) {
    var data = [];
    this.energyConsumptionData.labels = [];
    if (deviceStats && deviceStats.length > 0) {
      for (let deviceStat of deviceStats) {
        //let tempData:Array<any> = [];
        this.energyConsumptionData.labels.push(deviceStat.createdOn);
        data.push(deviceStat.energyConsumed); 
        // this.lineChartData.push(tempData);
      }
      this.energyConsumptionData.datasets[0].data = data;
        let timeoutId = setTimeout(() => {  
          this.chart.refresh();
        }, 50);
      
    }
  }



  setActiveMode(mode:string, status:number){
     localStorage.setItem("opMode", mode);
     localStorage.setItem("opNumber",status+"");
   
  }

  public lineChartColors: Array<any> = [
    { 
      // backgroundColor: 'rgba(148,159,177,0.2)',
      //borderColor: 'rgba(148,159,177,1)',
      // pointBackgroundColor: 'rgba(148,159,177,1)',
     // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'

    },
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

getLabel(value: string) {
  if(value == 'd'){
  return "Last 30 days";
  }
  if(value == 'h'){
  return "Last 24 hours";
  }
  if(value == 'realtime'){
  return "Last 1 hour";
  }
}


  
}








