import { DemandView, BaseDemandView } from "./demand-view";
import {DemandListService} from "../../services/demand-list.service";
import { businessMessages, OfferBizView, LaunchBizView } from "@zapsod/common/lib/business-side";
import {Address} from "../../models/common/address"
import { DemandListItemComponent } from "../../pages/demand-list/item.component";
import { IDemand } from '@zapsod/common';

/**
 * Created by promie on 12-Jan-17.
 */

export class DemandViewAvailNew implements DemandView{

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

    status = "בקשת שירות חדשה"
    cta1 = "אני זמין/ה"
    cta2 = "התעלם"
    className = "new";
    
    cta1Click(){ //Accept
        console.log('accepting this launch', this.launch.id);
        this.launchItem.demandsService.acceptOffer(this.offer)
    }

    cta2Click() {
        console.log('rejecting offer', this.launch.id)
            this.launchItem.demandsService.rejectOffer(this.offer);
    }
}
