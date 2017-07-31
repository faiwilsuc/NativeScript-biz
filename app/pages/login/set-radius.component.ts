
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {businessMessages} from "@zapsod/common/lib/business-side";
import { registerElement } from "nativescript-angular/element-registry";
import { ApplicationService } from "../../services/application.service";
// import { MapView, Marker, Position, Circle } from "nativescript-google-maps-sdk"
import { RouterExtensions } from "nativescript-angular";
import { ICoords } from '@zapsod/common';
import { Page } from 'ui/page';

declare const MapView: any
declare var Marker: any
declare var Position: any
declare var Circle: any

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "set-radius-component",
    templateUrl: "pages/login/radius.component.html",
    styles: [".page-container{height:80%; width:80%}"],
    providers: []
})
export class SetRadiusComponent{
    sendRadiusToServer = businessMessages.updateRadius.clientSide()
    mapObj: any //MapView;
    radius = 100;
    mapCircle;
    private viewMap = false;
    @ViewChild("MapView") mapView: ElementRef;

    constructor(private appService: ApplicationService, private router: RouterExtensions, private page: Page, ){
        console.assert(!!appService.myBusiness, "business must be defined at this point");
        console.dir(this.appService.myBusiness)
        this.page.actionBarHidden = true;
    }

    ngOnInit(){
        setTimeout(()=> this.viewMap = true, 1)
    }

    updateRadius(newRadius){
        console.log("new radius", newRadius)
        this.radius = newRadius;
        if (this.mapObj){this.mapObj.requestLayout();}
    }

    saveRadius(){
        // this.sendRadiusToServer.send(this.radius).then(()=>{
        //     console.log("radius saved")
        //     this.router.navigate(["/main", {clearHistory: true}]);
        // })
        this.router.navigate(["/main", {clearHistory: true}]);        
    }

    onMapReady(args) {
        console.log("STARTED MAP READY! ", args.object);
        console.dir(args.object.gMap);
        // this.mapObj = args.object;

        // let marker = new Marker();
        // let coords: Partial<ICoords> = this.appService.myBusiness.location || {};
        // console.assert(!!coords, "coords doesnt exist");
        // console.log("coords", coords);
        // this.mapObj.latitude = coords.lat || 31.6
        // this.mapObj.longitude = coords.long || 35
        // if (coords){
        //     marker.position = Position.positionFromLatLng(coords.lat, coords.long);
        //     this.mapObj.addMarker(marker);
        //     this.setCircle(this.mapObj, marker.position);
        // }
        // else{
        //         console.error("no coords were found on business");
        // }
        // marker.title = this.appService.myBusiness.name;
        //this.mapObj.requestLayout();
    }

    setCircle(map: any /*MapView*/, position: Position){
        if (this.mapCircle){map.removeShape(this.mapCircle)};
        this.mapCircle = new Circle();
        this.mapCircle.center = position;
        this.mapCircle.radius = this.radius;
        map.addCircle(this.mapCircle);
    }
}


