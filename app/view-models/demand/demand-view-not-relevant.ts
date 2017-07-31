
import { BaseDemandView, DemandView } from "./demand-view";
import { IDemand, StateAwareness } from '@zapsod/common';
import { businessMessages, OfferBizView, LaunchBizView } from "@zapsod/common/lib/business-side";
import { DemandListItemComponent } from "../../pages/demand-list/item.component";
import { Address } from "../../models/common/address"

export class DemandViewOtherBizChosen implements DemandView {

    
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

    status = "לצערנו, עסק אחר הגיב לפניך ונבחר";
    cta1 = "בסדר, נקה"
    className = "not-relevant";

    cta1Click(){
        updateAwarenessToSeen()
    }
}





export class DemandTimedOut implements DemandView {

    
    constructor(protected launchItem: DemandListItemComponent){
    }
    
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

    status = "לצערנו, הזמן שהוגדר לבקשה פג, ואין אפשרות לענות לה";
    cta1 = "בסדר, נקה"
    className = "not-relevant";


    cta1Click(){
        updateAwarenessToSeen()
    }
}






export class DemandViewCanceled implements DemandView {

    status = "לצערנו, עסק אחר הגיב לבקשה לפניך ונבחר";
    cta1 = "בסדר, נקה"
    className = "not-relevant";

    
    constructor(protected launchItem: DemandListItemComponent){
    }
    
    /////////// Shortcuts to objects
    protected get demand(): IDemand {
        return this.launchItem.offer.launch.demand;
    }

    protected get launch(): OfferBizView{
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

    cta1Click(){
        updateAwarenessToSeen()
    }
}
    
    function updateAwarenessToSeen(){
        this.launchItem.demandsService.updateOfferAwarness.send({
            offerId: this.launch.offer.id, currentState: this.launch.offer.state}).
            then(() => // will remove it from list
            this.launchItem.demandsService.getOffers.send(null))
    }