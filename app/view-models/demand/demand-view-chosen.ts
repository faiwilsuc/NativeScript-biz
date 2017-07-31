import { DemandView, BaseDemandView } from "./demand-view";
import {DemandListService} from "../../services/demand-list.service";
import {ApplicationService} from "../../services/application.service";
import { businessMessages, OfferBizView, LaunchBizView } from "@zapsod/common/lib/business-side";
import { Address } from "../../models/common/address"
import { DemandListItemComponent } from "../../pages/demand-list/item.component";
import { IDemand, StateAwareness } from '@zapsod/common';

export class DemandViewChosen implements DemandView{
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
        return `הבקשה מועברת ליומן עבודה`;
    }

    text(){
        return this.demand.time && this.demand.time.getString() + " " +
            new Address(this.demand.address).toString();
    }

    status = "נבחרת!"
    cta1 = "אישור"
    className = "chosen";
        
    cta1Click(){ //Accept
        this.updateAwarenessToSeen()
        console.log('calling customer');
    }

    updateAwarenessToSeen(){
        this.offer.state.businessAwareness = StateAwareness.Seen;
        this.launchItem.demandsService.updateOfferAwarness.send({
            offerId: this.offer.id, currentState: this.offer.state}).
            then(() => // will remove it from list
            this.launchItem.demandsService.getOffers.send(null))
    }
}       