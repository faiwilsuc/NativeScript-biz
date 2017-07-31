import { DemandView, BaseDemandView } from "./demand-view";
import {DemandListService} from "../../services/demand-list.service";
import {ApplicationService} from "../../services/application.service";
import { businessMessages, OfferBizView, LaunchBizView } from "@zapsod/common/lib/business-side";
import {Address} from "../../models/common/address"
import * as dialogs from "ui/dialogs";
import { DemandListItemComponent } from "../../pages/demand-list/item.component";
import { IDemand } from '@zapsod/common';

/**
 * Created by promie on 12-Jan-17.
 */

export class DemandViewQuoteNew implements DemandView{
    
    constructor(protected launchItem: DemandListItemComponent){
    }
    
    /////////// Shortcuts to objects
    protected get demand(): IDemand {
        return this.launchItem.offer.launch.demand;
    }

    protected get launch(): LaunchBizView{
        return this.launchItem.offer.launch;
    }
    
    protected get offer(): OfferBizView{
        return this.launchItem.offer;
    }
    ///////////

    title(){
        return this.status;
    }

    subtitle() {
        return this.demand.time && this.demand.time.getString() || "";
    }
    
    text(){
        return new Address(this.demand.address).toString();
    }

    toggleCollapse( ){
        if (this.launchItem.isCollapsed){
            console.log('showing')
            this.cta1 = this.cta1_shown;
        }
        else{
            this.cta1 = this.cta1_collapsed
        }
        
    }
    status = "בקשה חדשה להצעת מחיר"

    readonly cta1_collapsed = "הגש הצעת מחיר";
    readonly cta1_shown = "שלח הצעה";

    cta1 = this.cta1_collapsed;
    cta2 = "התעלם"
    className = "new";

    cta1Click(view?){ //Accept
        console.log('this.offer', this.offer);
        if (this.launchItem.isCollapsed){
            this.launchItem.toggleCollapse(null);
        }
        else{
            let options = {
                title: "הוספת תגובה ללקוח",
                defaultText: "היי אני בעל מקצוע חביב ששמח לעזור",
                inputType: dialogs.inputType.text,
                okButtonText: "שלח תגובה",
                cancelButtonText: "בטל"
            };

            dialogs.prompt(options).then((result: dialogs.PromptResult) => {
                if (!this.offer.reply){
                    this.offer.reply = {};
                }
                this.offer.reply.reply = result.text;
                this.offer.repliedAt = new Date();
                console.log("the launch is ", this.offer)
                console.dir(this.offer);
                this.launchItem.demandsService.acceptOffer(this.offer);
            })
        }
    }

    cta2Click() {
        this.launchItem.demandsService.rejectOffer(this.offer);
    }
}
