import {Component, OnInit, Input, OnChanges, EventEmitter, Output} from "@angular/core";
 import { IDemand, OfferReply } from "@zapsod/common";
 import { OfferBizView } from "@zapsod/common/lib/business-side";
 import { ActivatedRoute } from "@angular/router";
 import { RouterExtensions } from "nativescript-angular/router";
 import { Page } from "ui/page";
import {QuoteService} from "../../services/quote.service";

@Component({
    selector: "quote",
    templateUrl: "pages/demand-list/quote.component.html",
    styleUrls: ["pages/demand-list/quote.component.css"]
})
export class QuoteComponent implements OnInit {
    offer: OfferBizView;
    reply // shortcut to reply in launch
    priceLimits = {min: 0, middle:50, max:100}; // Dummy values until init finishes

    constructor(page: Page, private routerExtensions: RouterExtensions, private routeParams: ActivatedRoute, public quoteService: QuoteService) {

     }

    ngOnInit(){
        // this.routeParams.params.subscribe((params) => {
		// 	this.offer = params["offer"];
    	// });
        this.offer = this.quoteService.getOffer();
        this.offer.reply = {reply: ""};
        this.reply = this.offer.reply;
        this.calculateLimits();
    }

    lowValueChanged(newValue){
        this.reply.price.low = newValue;
        if (this.reply.price.high < this.reply.price.low){
            this.reply.price.high = this.reply.price.low;
        }
    }

    highValueChanged(newValue){
        this.reply.price.high = newValue;
        if (this.reply.price.high < this.reply.price.low){
            this.reply.price.low = this.reply.price.high;
        }
    }

    calculateLimits(){
        this.reply.price = {low: this.offer.launch.demand.details.finalPrice.low, high:this.offer.launch.demand.details.finalPrice.high };
        this.priceLimits.max = this.offer.launch.demand.details.finalPrice.high * 1.2;
        this.priceLimits.min = this.offer.launch.demand.details.finalPrice.low * 0.8;
    }
}