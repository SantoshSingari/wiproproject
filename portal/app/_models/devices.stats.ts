import { DeviceStatus } from './device.status';


export class DevicesStats{
    id:number;
    status:number;
    uid:string;
    devicesUid:string;
    tenantId:number;
    energyConsumed:number;
    tenantUid:string;
    createdOn:string;

    fixtureStatus: DeviceStatus;
    wallMountStatus: DeviceStatus;
    sensorStatus: DeviceStatus;

}