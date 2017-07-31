import {Component} from "@angular/core";
import {Business} from "../../models/business/Business"
import {ApplicationService} from "../../services/application.service";
/**
 * Created by promie on 08-Dec-16.
 */
@Component({
    selector: "business-card",
    styleUrls: ["pages/workspace/workspace.css"],
    templateUrl: "pages/workspace/business-card.html"
})
export class BusinessCardComponent{
    constructor(private appService: ApplicationService){
        this.appService.myBusiness;
    }
    ngOnInit(){
        console.assert(!!this.appService.myBusiness
        , "must be logged in!")
    }

}