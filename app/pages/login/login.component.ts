/**
 * Created by promie on 28-Nov-16.
 */
import { Component,ElementRef, OnInit, ViewChild } from "@angular/core";
import {Page} from "ui/page";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";
import {WebView, LoadEventData} from "ui/web-view"
import {ApplicationService} from "../../services/application.service";
import * as appSettings from "application-settings"
import * as qs from "querystring"
import {isIOS, isAndroid} from "platform"

@Component({
    selector: "login",
    templateUrl: "pages/login/login.component.html",
    styleUrls: ["pages/action-bar.css", "pages/login/login-common.css"],
    providers: []
})
export class LoginComponent implements OnInit {

    loginFormIsLoaded = true;
    readonly SSOSrc = 
    `https://ssotest.zap.co.il/Account/bizsiteLogin.aspx?SiteID=31&fields=Username,ID,Email,firstname,lastname,sessionkey,Cellular,Cellular_Prefix,Password&iframe=1&noRefresh=1`
    + `&callback=SSO_CallBack&ReturnUrl=https://zapsod-srv.azurewebsites.net/login-callback.html`;
    constructor(private router: RouterExtensions, private page: Page, private appService: ApplicationService){
        this.page.actionBarHidden = true;
        
    }

    ngOnInit(){
        let loginWebView = this.page.getViewById<WebView>("loginModal");

        loginWebView.on(WebView.loadStartedEvent, eventData => {
                    if (isIOS){
            loginWebView.ios.backgroundColor = UIColor.colorWithWhiteAlpha(1, 0);
        }
        if (isAndroid){
                loginWebView.android.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                console.log("setting zoOom", loginWebView.android.getSettings().setBuiltInZoomControls);
                loginWebView.android.getSettings().setBuiltInZoomControls(false);
            }
        })
        loginWebView.on(WebView.loadFinishedEvent, (args: LoadEventData)=> this.checkAutorization(args.url));
        loginWebView.on(WebView.propertyChangeEvent, ()=> console.log("webview propertyChangeEvent"));
        loginWebView.on(WebView.loadedEvent, ()=> console.log("webview loadedEvent"));
    }

    checkAutorization(url: string){
        this.loginFormIsLoaded = true;
        if (!url){
            console.log("checking auth but URL was "+ url)
            return;
        }
        let query = url.split("?");
        console.assert(query.length === 2, "it should have only one question mark in url")
        var res = qs.decode(query[1]);
        console.log("check auth result", res)
        let userDetails = res["userdetails"];
        if (userDetails){
            let parsed = JSON.parse(decodeURI(userDetails));
            console.log("cust id ", parsed.CustID)
            let bizId = parseInt(parsed.CustID);
            this.appService.logon(bizId).then(()=>{
                appSettings.setString("BizId",parsed.CustID.toString());
                this.appService.bizId = bizId;
                this.router.navigate(["/main", {clearHistory: true}])
                
                // this.router.navigate(['/main', {clearHistory: true}]).
                // catch(err => console.error("navigation error", err));
            })
        }
    }
}