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
var Rx_1 = require("rxjs/Rx");
var core_1 = require("@angular/core");
var primeng_1 = require("primeng/primeng");
var index_1 = require("../_services/index");
var index_2 = require("../_models/index");
var GlobalEventsManager_1 = require("../GlobalEventsManager");
var DashboardComponent = (function () {
    function DashboardComponent(dashboardService, globalEventsManger, deviceService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.globalEventsManger = globalEventsManger;
        this.deviceService = deviceService;
        this.totalWattage = new index_2.TotalWattage();
        this.co2reduced = 0;
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.lineChartColors = [
            {},
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.durationList = [];
        this.durationList.push({ label: 'By Day', value: 'd' });
        this.durationList.push({ label: 'Last 24 hours', value: 'h' });
        this.durationList.push({ label: 'Real Time in Minutes', value: 'realtime' });
        this.activeMode = 'all';
        this.floorList = [];
        this.floorList.push({ label: 'Floor 1', value: 'F1' });
        this.floorList.push({ label: 'Floor 2', value: 'F2' });
        this.floorList.push({ label: 'Floor 3', value: 'F3' });
        Rx_1.Observable.interval(10000).subscribe(function (x) {
            if (_this.selectedDuration == 'realtime') {
                _this.refreshChart();
            }
        });
        this.illumainanceData = {
            labels: ['People', 'Focus', 'Engage', 'Collabaration', 'Social'],
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
                }
            ]
        };
        this.energyConsumptionData = {
            labels: [],
            datasets: [{
                    label: 'Watts',
                    //data: [65, 59, 80, 81, 56, 55, 40],
                    //fill: true,
                    borderColor: '#4bc0c0'
                    //backgroundColor: '#4bc0c0'
                }
            ],
        };
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
            labels: ['People', 'Focus', 'Engage', 'Collabaration', 'Social'],
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
                }
            ]
        };
        this.pieChartOptions = {
            title: {
                display: false,
                text: 'My Title',
                fontSize: 16
            },
            legend: {
                display: false,
                position: 'right'
            }
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getTotalWattage();
        //  this.trees();
        this.globalEventsManger.showNavBar(true);
        this.selectedDuration = 'd';
        this.selectedLabel = this.getLabel(this.selectedDuration);
        this.reloadChart(this.chart);
        this.getDeviceStatistics();
    };
    DashboardComponent.prototype.getDeviceStatus = function () {
        var _this = this;
        this.dashboardService.getStatus().subscribe(function (deviceStatusObj) {
            _this.deviceStatus = deviceStatusObj;
            console.log(_this.deviceStatus);
        }, function (error) {
            console.log(error);
        });
    };
    DashboardComponent.prototype.getEnergyConsumption = function (param) {
        var _this = this;
        this.dashboardService.energyConsumption(param).subscribe(function (data) {
            _this.deviceEnergyStats = data;
            _this.createChart(_this.deviceEnergyStats);
        }, function (error) {
        });
    };
    DashboardComponent.prototype.showDrop1 = function () {
        this.isShowDropdown1 = true;
    };
    DashboardComponent.prototype.refreshChart = function () {
        if (this.selectedDuration == 'realtime') {
            this.refreshEnergyConsumption(this.selectedDuration);
        }
    };
    DashboardComponent.prototype.getDeviceStatistics = function () {
        var _this = this;
        this.dashboardService.getDeviceStatistics().subscribe(function (data) {
            _this.deviceStats = data;
        }, function (error) {
        });
    };
    DashboardComponent.prototype.getTotalWattage = function () {
        var _this = this;
        this.dashboardService.getWattage().subscribe(function (data) {
            _this.totalWattage = data;
            _this.noOfTrees = ((_this.totalWattage.energySavings / 1000) * 0.0005925) * 0.5;
            _this.co2reduced = (_this.totalWattage.energySavings / 1000) * 0.0005925 * 1000;
            if (_this.noOfTrees > 0 || _this.noOfTrees < 1) {
                _this.noOfTrees = 1;
            }
            _this.co2reduced = Math.ceil(_this.co2reduced);
        }, function (error) {
        });
    };
    DashboardComponent.prototype.trees = function (tw) {
        return " " + (tw.energySavings * 0.92 * 0.5) / 1000 + " ";
    };
    DashboardComponent.prototype.reloadChart = function (chart) {
        this.refreshEnergyConsumption(this.selectedDuration);
        this.selectedLabel = this.getLabel(this.selectedDuration);
    };
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
    DashboardComponent.prototype.refreshEnergyConsumption = function (param) {
        var _this = this;
        this.selectedDuration = param;
        //this.selectedLabel = getLabel(this.selectedDuration);
        this.dashboardService.energyConsumption(param).subscribe(function (data) {
            _this.deviceEnergyStats = data;
            _this.createChart(_this.deviceEnergyStats);
        }, function (error) {
        });
    };
    DashboardComponent.prototype.checkVal = function (param) {
        if (param == undefined || param == null) {
            return "--";
        }
        return param;
    };
    DashboardComponent.prototype.calcTreeCount = function () {
        if (this.deviceStats.energyConsumed == undefined || this.deviceStats.energyConsumed == 0) {
            return 0;
        }
        else {
            return this.deviceStats.energyConsumed * 10; //replace this valid formula
        }
    };
    DashboardComponent.prototype.calcEmission = function () {
        if (this.deviceStats.energyConsumed == undefined || this.deviceStats.energyConsumed == 0) {
            return 0;
        }
        else {
            return this.deviceStats.energyConsumed * 20; //replace this valid formula
        }
    };
    DashboardComponent.prototype.getTotal = function (param) {
        var total = 0;
        if (param.onCount != undefined) {
            total = param.onCount;
        }
        if (param.offCount != undefined) {
            total = total + param.offCount;
        }
        if (param.nonOpCount != undefined) {
            total = total + param.nonOpCount;
        }
        return total;
    };
    DashboardComponent.prototype.createChart = function (deviceStats) {
        var _this = this;
        var data = [];
        this.energyConsumptionData.labels = [];
        if (deviceStats && deviceStats.length > 0) {
            for (var _i = 0, deviceStats_1 = deviceStats; _i < deviceStats_1.length; _i++) {
                var deviceStat = deviceStats_1[_i];
                //let tempData:Array<any> = [];
                this.energyConsumptionData.labels.push(deviceStat.createdOn);
                data.push(deviceStat.energyConsumed);
                // this.lineChartData.push(tempData);
            }
            this.energyConsumptionData.datasets[0].data = data;
            var timeoutId = setTimeout(function () {
                _this.chart.refresh();
            }, 50);
        }
    };
    DashboardComponent.prototype.setActiveMode = function (mode, status) {
        localStorage.setItem("opMode", mode);
        localStorage.setItem("opNumber", status + "");
    };
    DashboardComponent.prototype.getLabel = function (value) {
        if (value == 'd') {
            return "Last 30 days";
        }
        if (value == 'h') {
            return "Last 24 hours";
        }
        if (value == 'realtime') {
            return "Last 1 hour";
        }
    };
    return DashboardComponent;
}());
__decorate([
    core_1.ViewChild("chart"),
    __metadata("design:type", primeng_1.UIChart)
], DashboardComponent.prototype, "chart", void 0);
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'dashboard.component.html'
    }),
    __metadata("design:paramtypes", [index_1.DashboardService, GlobalEventsManager_1.GlobalEventsManager, index_1.DeviceService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map