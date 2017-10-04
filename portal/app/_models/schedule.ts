export class Schedules {
    id: number;
    status: number;
    uid: string;
    name: string = "";
    description: string = "";
    scheduledAt: number = 0;
    tags: string = "";
    intensity: number;
    lastRunStatus: string;
    lastRunStatusMessage: string;
    lastRanAt: string;
    monDay: number;
    tuesDay: number;
    wednesDay: number;
   // weekdays:string;
    thrusDay: number;
    friDay: number;
    satDay: number;
    sunDay: number;
    createdTime:number;
    modifiedTime:number;
    createdOn:string;
    modifiedOn:string;
    createdBy:number;
    modifiedBy:number;
    tenantUid: string;
    tenantId: string;
    tagNames:string = "";
    scheduleAtText:any;
}

