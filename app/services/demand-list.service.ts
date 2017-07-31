/**
 * Created by promie on 28-Nov-16.
 */
import {Injectable, Inject} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {ObservableArray} from "data/observable-array";
import {Address} from "../models/common/address"
import {timeFactory} from "../shared/time-factory"
import { ApplicationService } from "./application.service";
import { businessMessages, commonMessages, OfferBizView } from "@zapsod/common/lib/business-side";
import { StateAwareness, DemandLocationType, State, OfferStage, LaunchStage } from "@zapsod/common";

@Injectable()
export class DemandListService{
    offers = new ObservableArray<OfferBizView>();
    approvedWorks = new ObservableArray<OfferBizView>()

    updateOfferStage = businessMessages.updateOfferStage.clientSide(resp =>{
    });

    updateOfferAwarness = businessMessages.OfferStateAwareSeen.clientSide();

    demandFulfilled = businessMessages.demandFulfilled.clientSide(resp => this.getOffers.send)

    private accept = businessMessages.acceptOffer.clientSide();
    acceptOffer = (offer: OfferBizView)=> this.accept.send(offer);

    ///////// Specialized result handlers
    rejectOffer = (offer: OfferBizView) => 
        this.updateOfferStage.send({offerId: offer.id, newStage: OfferStage.BusinessIgnored});

    cancelOffer = (offer: OfferBizView) => this.updateOfferStage.send({offerId: offer.id, newStage: OfferStage.BusinessCanceledApproval});

    constructor( @Inject(ApplicationService) readonly app: ApplicationService ){

        this.app.socket$.subscribe(()=>{
            console.log("getting offers after socet event")
            this.getOffers.send(null);
        })

        businessMessages.OfferUpdate.clientSide(resp=>{ // should only be pushed from server
            console.log("received launch update!!!!!!!", resp.data.updatedOfferOrOfferId);
            
            if (resp.data.updateMessage){
                alert(resp.data.updateMessage);
            }

            // THIS IS CURRENTLY A MESS
            if ((<OfferBizView>resp.data.updatedOfferOrOfferId).id){ // If it has a full offer sent
                let updatedOffer = <OfferBizView>resp.data.updatedOfferOrOfferId;
                console.log("adding update to list", updatedOffer.id)
                this.addLaunchToList(updatedOffer);
                return
            }

            if (resp.data.action === "removeFromListNoMsg"){
                let {offerId} = <{offerId: number}>resp.data.updatedOfferOrOfferId;
                console.log("removing from list offer id ", offerId)
                this.removeFromOfferList(offerId);
            }
            else{
                console.error("UNHANDELED UPDATE!!!")
            }
        })
    }

    getOffers = businessMessages.getBizOffers.clientSide(resp =>{
        if (resp instanceof  commonMessages.GeneralError){
            console.error("error in getOffers " + resp);
        } else if (businessMessages.responses.Offers.MatchesAnyResponseName(resp.responseName)){
            // If it is my request i'll get all those i already have.
            console.log("event ", resp.responseName, " pushed from server?", resp.pushedFromServer, 'data', resp.data)
            if (!resp.pushedFromServer){
                this.resetOffers();
            }
            resp.data.forEach(this.addLaunchToList, this);
        }
    })

    resetOffers(){
        console.log("resetting offers");
        this.offers.splice(0);
        this.approvedWorks.splice(0);
    }

    private removeFromOfferList(offerId: number){
        this.offers.splice( this.offers.indexOf(this.offers.filter(o => o.id === offerId)[0]), 1);
    }

    addLaunchToList(offer: OfferBizView) {
        this.preapareLaunch(offer);

        if (offer.launch.stage === LaunchStage.BizChosen){
            console.log("added to approved works")
            console.dir(offer.state)
            this.insertOrReplace(this.approvedWorks, offer);

            // if business hasn't seen yet the success it needs to be also in the regulat list
            if (offer.state.businessAwareness !== StateAwareness.Seen){
                this.insertOrReplace(this.offers, offer);
            }
        } else {
            console.log("added to launches")
            this.insertOrReplace(this.offers, offer);            
        }
    }

    preapareLaunch(offer: OfferBizView): OfferBizView{
        offer.launch.demand.time = timeFactory(offer.launch.demand.time);
        // if (!launch.demand.place){
        //     launch.demand.place = {}
        // }
        // launch.demand.place.address = 'אליהו ספיר 4 תל אביב';//new Address(launch.demand.place.address);
        return offer;
    }

    insertOrReplace(list: ObservableArray<OfferBizView>, element: OfferBizView){
        let foundItem = false;
        console.log("list.len", list.length)
        for (let i = 0; i < list.length; i++){
            if (list.getItem(i).id == element.id){
                console.log('replacing offer', element.id);
                list.setItem(i, element);
                foundItem = true;
                break;
            }
        }

        if (!foundItem){
            console.log("pushing new item");
            list.push(element);            
        }
    }


}