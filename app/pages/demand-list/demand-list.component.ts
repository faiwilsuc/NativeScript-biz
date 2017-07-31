/**
 * Created by promie on 28-Nov-16.
 */
import {Component, OnInit, OnChanges, ChangeDetectorRef, Inject, ViewChild, ElementRef} from "@angular/core";
import {DemandListService} from "../../services/demand-list.service";
import {ObservableArray} from "data/observable-array";
import {Color} from "color";
import { Subscription } from "rxjs/Subscription";
import { OfferBizView } from "@zapsod/common/lib/business-side";

import {ListView} from "ui/list-view";

@Component({
    selector: "demand-list",
    templateUrl: "pages/demand-list/demand-list.html",
    styleUrls:["pages/demand-list/demand-list.css"]
})
export class DemandListComponent implements OnInit, OnChanges {
    @ViewChild("list") list: ElementRef;
    subs : Subscription

    constructor(@Inject(DemandListService)private demandService : DemandListService){}

    ngOnInit(){
        console.log('init demand list')
        this.demandService.getOffers.send(null, {reset: true});
        this.demandService.offers.on("change", changeData =>{
            console.log("change in demand service launches");
            this.list.nativeElement.requestLayout();
        })
        //this.demandService.launches.on(ObservableArray.changeEvent, ()=>{this.changeDet.detectChanges(); console.log('chage occured in lanuces ', this.demandService.launches.length)});

        //setInterval(()=>{this.changeDet.detectChanges(); console.log('launches: ', this.demandService.launches.length)})
        // this.subs = this.demandService.subject.subscribe((demand) => {
        //     this.offers = this.demandService.tempGet();
        //     this.changeDet.detectChanges();
        //     console.log('offers: ', this.offers.length)})
        //setInterval(()=>{ console.log('offers', this.offers)}, 4000)
    }

    ngOnChanges(){
        console.log('onchange');
        this.list.nativeElement.requestLayout();
    }

    itemTapped(event){
        this.list.nativeElement.requestLayout();

    }
    makeTransparent(args){
        if (args.ios){
            args.ios.backgroundColor = new Color('transparent').ios;
        }
    }
}
