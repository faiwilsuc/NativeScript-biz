/**
 * Created by promie on 30-Nov-16.
 */
import { Component,ElementRef, OnInit, ViewChild } from "@angular/core";
import { TabView, TabViewItem } from "ui/tab-view";
import {Page} from "ui/page";
import {DemandListService} from "../../services/demand-list.service";
import {ApplicationService} from "../../services/application.service";

//[selectedIndex]="tabindex" exampleTitle toggleNavButton>

const LaunchesTab = 1;
@Component({
    selector: "main",
    templateUrl: "pages/main/main.component.html",
    styleUrls: [ "pages/action-bar.css", "pages/main/main-common.css"],
    providers: [DemandListService]
})
export class MainComponent implements OnInit {
    @ViewChild("tabview") tab: ElementRef;

    //public tabView: TabView;
    selIndex:number = 1; 
    constructor(private page :Page, private demandService: DemandListService, private appService: ApplicationService){
        // this.page.backgroundSpanUnderStatusBar = true;
         page.actionBarHidden = true;
    }

    onSelTab(index){
		this.selIndex = index;
	}


    ngOnInit(){
        //this.tabView = this.tab.nativeElement;
        //this.appService.getBusinessData()
    }
    tabChanged(selectedIndex){
        //console.log('selected index changed ', selectedIndex);
        //if (selectedIndex === 1){
            //this.demandService.getOffers.send(null);
        //}
    }
}