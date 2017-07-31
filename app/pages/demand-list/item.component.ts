/**
 * Created by promie on 28-Nov-16.
 */
import {Component, Input, OnChanges, EventEmitter, Output, ElementRef, ChangeDetectorRef} from "@angular/core";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {DemandView} from "../../view-models/demand/demand-view";
import {DemandViewFactory} from "../../view-models/demand/demand-view";
import { OfferBizView } from "@zapsod/common/lib/business-side";
import {DemandListService} from "../../services/demand-list.service";
import {QuoteService} from "../../services/quote.service";
import {OfferStage} from "@zapsod/common";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import {Page} from "ui/page";

@Component({
    selector: "demand-item",
    templateUrl: "pages/demand-list/item.component.html",
    styleUrls: ["pages/demand-list/item-common.css"]

})
export class DemandListItemComponent implements OnChanges {
    demandView: DemandView;
    @Output() tap = new EventEmitter();
    @Input() offer: OfferBizView;
    isCollapsed = true;
    showQuote = false;

    OfferStage = OfferStage;

    constructor(private router: RouterExtensions,private page :Page, private changeDet: ChangeDetectorRef, private element : ElementRef, public demandsService: DemandListService, public quoteService: QuoteService){ 
       
    }

     ngOnChanges(){
         console.log('item change', this.offer.id);
         this.demandView = DemandViewFactory(this.offer, this);
     }


    toggleCollapse(event){
        this.isCollapsed = !this.isCollapsed // toggle collapse
        this.demandView.toggleCollapse && this.demandView.toggleCollapse();

        console.log("clicked toggleCollapse", this.isCollapsed);
        //this.changeDet.detectChanges();
        setTimeout(() => {
            this.element.nativeElement.requestLayout();
            this.tap.emit(event);
        }, 1);

    }

    cta1Click(){
        this.demandView.cta1Click();
        // if(this.demandView.className=='chosen'){
        //     this.quoteService.setOffer(this.offer);
        //      this.router.navigate(["quote"], {clearHistory: true, transition: {
        //                 name: "slideBottom"
        //             }});		
        // }
    }

}