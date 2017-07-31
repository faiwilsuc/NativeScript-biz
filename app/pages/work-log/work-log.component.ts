import {Component, Input} from "@angular/core";
import {DemandListService} from "../../services/demand-list.service";

@Component({
    selector: "work-log",
    styleUrls:["pages/work-log/work-log-common.css"],
    templateUrl: "pages/work-log/work-log.html"
})
export class WorkLogComponent{
    constructor(private demandService: DemandListService){
    }

}