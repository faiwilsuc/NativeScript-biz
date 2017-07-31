import { OfferBizView, LaunchBizView } from "@zapsod/common/lib/business-side";
import {DemandViewAvailNew} from "./demand-view-avail-new";
import {DemandViewQuoteNew} from "./denad-view-quote-new";
import {DemandViewWaiting} from "./demand-view-waiting";
import {DemandViewChosen} from "./demand-view-chosen";
import {DemandViewCanceled, DemandTimedOut, DemandViewOtherBizChosen} from "./demand-view-not-relevant";
import { LaunchStage, OfferStage, IDemand } from "@zapsod/common"
import { DemandListItemComponent } from "../../pages/demand-list/item.component";
import { Address } from "../../models/common/address";
/**
 * Created by promie on 09-Jan-17.
 */

export interface DemandView{
    title
    subtitle
    text
    status
    cta1
    cta2?
    cta1Click()
    cta2Click?()
    toggleCollapse?()
    className : string;
}

export class BaseDemandView {
    
    status
    launchItem

    
    /////////// Shortcuts to objects
    protected get demand(): IDemand {
        return this.launchItem.offer.launch.demand;
    }

    protected get launch(): LaunchBizView{
        return this.launchItem.offer.launch;
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
}

export function DemandViewFactory(offer: OfferBizView, item): DemandView{
    var result: DemandView
    if (offer.state.stage === OfferStage.New){
        if (offer.launch.demand.details.finalPrice){
            result = new DemandViewQuoteNew(item);
        }else{
            result = new DemandViewAvailNew( item)
        }
    }
    else if (offer.state.stage === OfferStage.BusinessApproved){
        result = new DemandViewWaiting(item); 
    }
    else if (offer.state.stage === OfferStage.OfferChosen){
        result = new DemandViewChosen(item);
    } 
    else if (offer.state.stage === OfferStage.CustomerCanceledLaunch){
        result = new DemandViewCanceled(item);
    } 
    else if (offer.launch.stage === LaunchStage.TimedOut){ // launch.offer.state.stage === OfferStage.TimedOut)<========= shouldn't have this offer stage
        result = new DemandTimedOut(item);
    } 
    else if (offer.state.stage === OfferStage.OtherBusinessChosen){
        result = new DemandViewOtherBizChosen(item);
    } 
        return result;
}

// case DemandStatus.Waiting:
// this.statusClass = "waiting";
// this.headerText = "הצעה ממתינה לאישור";
// return;
// case DemandStatus.Approved:
// this.statusClass = "approved";
// this.headerText = "הזמנה מאושרת"
// this.CTA = "לשיפור הצעת המחיר";
