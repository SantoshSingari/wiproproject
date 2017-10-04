import {Tag} from '../_models/index'
export class Device {
    id:number;
    status:number;
    uid:string;
    deviceType:string;
    serialNumber:string;
    mac:string;
    groupId:number;
    model:string;
    tenantId:number;
    tenantUid:string;
    ipAddress:string;
    productCode:string;
    intensity:number;
    name:string;
    category:string;
    tags:Tag[];
    tagNames:string;
    categoryUid:string;
}