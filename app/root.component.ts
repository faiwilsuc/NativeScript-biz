import { Component, OnInit } from "@angular/core";
import {ApplicationService} from "./services/application.service";
import {RouterExtensions} from "nativescript-angular";
import {Router} from "@angular/router"

import * as appSettings from "application-settings"

@Component({
    selector: "my-app",
    template: "<page-router-outlet></page-router-outlet>",
})
export class RootComponent implements OnInit {

    constructor(private app : ApplicationService, private router: RouterExtensions ){
        if (!this.app.bizId){
            console.log('notlogged')
            this.router.navigate(["/intro"]);
        }
        else{
            this.router.navigate(["/main", {clearHistory: true}])
        }
    }

    ngOnInit(){
    }
}