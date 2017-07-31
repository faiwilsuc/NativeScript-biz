import {Component} from "@angular/core";
import {BusinessCardComponent} from './business-card';
import { Business } from "../../models/business/Business";
import { ApplicationService } from "../../services/application.service";
import { Router } from "@angular/router";
import * as dialogs from "ui/dialogs";

/**
 * Created by promie on 01-Dec-16.
 */

let template = `
<GridLayout rows="*, auto" id="workspace">
    <StackLayout row="0">
        <business-card></business-card>
        <StackLayout class="box">
            <label class="h1" text="סטטיסטיקה"></label>
            <workspace-stats></workspace-stats>
        </StackLayout>
    </StackLayout>
    <GridLayout row="1" columns="*,*">
        <CardView col="0" shadowOffsetHeight="4">
            <button  class="btn red-bg" text="התנתק" (tap)="disconnect()"></button>
       </CardView>
       <CardView col="1" shadowOffsetHeight="4">
        <button  class="btn blue-bg" text="שִׂיחָה" (tap)="disconnect()"></button>
       </CardView>
    </GridLayout>
</GridLayout>`

@Component({
    selector: "workspace",
    styleUrls: ["pages/workspace/workspace.css"],
    //providers: [BusinessCardComponent],
    template: template
})
export class WorkspaceComponent {
    constructor(private appService: ApplicationService, private router: Router){
        
    }

    ngOnChanges(){
        console.log("workspace on changes my business", this.appService.myBusiness)
    }
    
    disconnect(){
        dialogs.confirm( "האם אתה בטוח שברצונך להתנתק?").then(result => {
            if (result){

                this.appService.disconnect(); // ASK IF SUREEEEEEEEEEEEEEEEEEEEEEEEEEEE
                console.log("this route", this.router.url);
                this.router.navigate(["/login", {clearHistory: true}])
            }
        })
    }
}