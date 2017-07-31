import {Component, Input} from "@angular/core";
import {OfferBizView} from "@zapsod/common/lib/business-side"
import { DemandListService } from "../../services/demand-list.service";
import { OfferStage } from "@zapsod/common";

@Component({
    selector: "work-log-item",
    styleUrls: ["pages/work-log/work-log-common.css"],
    templateUrl: "pages/work-log/work-log-item.html"
})
export class WorkLogItemComponent{

    @Input() launch; LaunchBizView;

    constructor(private demandsService :DemandListService){}
    getDateInWords(){
        return "היום";
    }

    getDate(){
        return "22.2.2017"
    }

    getAddress(){
        return "פינסקר תל אביב"
    }

    getTime(){
        return "בשעה 12:00"
    }

    navigate(){

    }
    call(){

    }
    sendCompleted(){
        this.demandsService.demandFulfilled.send(this.launch.id);
    }
}