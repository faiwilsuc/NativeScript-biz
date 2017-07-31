import {Injectable} from "@angular/core";
import {SocketIO} from 'nativescript-socketio';
import { businessMessages, commonMessages } from "@zapsod/common/lib/business-side";
import {BehaviorSubject, Subject} from "rxjs"
import * as appSettings from "application-settings"
import { IBusiness, BufferingSocket, ClientSide } from "@zapsod/common";
import * as application from 'application';
import {platformCommon } from "../platform-common";

/**
 * Created by promie on 13-Dec-16.
 */
@Injectable()
export class ApplicationService {
    myBusiness: IBusiness;
    loggedIn : boolean = false;
    appVer :string
    bizId = parseInt(appSettings.getString("BizId"));
    socket$ = new Subject<BufferingSocket>();
   
    private doLogon = businessMessages.logon.clientSide(resp=>{
        if (businessMessages.responses.isSuccessWithBusiness(resp)){
            this.myBusiness = resp.data;
            if (!this.bizId){
                console.log("setting bizId after first login (not from saved setting)")
                this.bizId = this.myBusiness.id;
            }
            this.pushConfig();
        }
        else if (businessMessages.responses.isLogonFailed(resp)){
            if (resp.data.reason === "appNeedUpdate"){
                console.error("app needs upgrade")
            }
            else if (resp.data.reason === "accountProblem"){
                console.error("account problem")
            }
            console.error("logon failed")
        }
    });

    logon(bizId: number){
        return this.doLogon.send({businessId: bizId, appVer: this.appVer}).then(

        )
    }
    
    //soc = new SocketIO('https://zapsod-srv.azurewebsites.net/businesses', {})
    soc = new SocketIO('http://192.168.14.18:8860/businesses', {});
    constructor( ){
        this.appVer = "0.2.0";
        console.log("application created. ver ", this.appVer)
        platformCommon.init();
        //SocketIO.enableDebug();
        let socket = new BufferingSocket(this.soc);
        ClientSide.setSocket(socket);
        socket.connect();

        this.loadAppSettings();
        socket.on('connect', (e)=>{
            console.log("socket connected", e)
            this.socket$.next(socket);

            socket.on('error', (...args) => console.log('error', ...args));
            socket.on('connect_error', (e) => console.log('conerr', e));
            socket.on('disconnect', (s, e) => {console.log('disconnect', s, e);});
            socket.on('reconnect', (s, e) => {
                console.log('reconnect SocId:', s.id, e);
                this.logon(this.bizId);
            })
        });
    }

    loadAppSettings(){
        if (!this.bizId){
            console.info("not loggded in")
        }
        else{
            console.info("found bizid, trying to login", this.bizId)
            this.socket$.subscribe( // wait for first value who is not null
                () => this.logon(this.bizId))
            // Do checks
        }
    }

    disconnect(){
        appSettings.remove("BizId")
        this.myBusiness = undefined;
    }

    pushConfig(){
        platformCommon.updatePushId.send(platformCommon.pushToken);
        // if (application.android){ // should seperate ios and android files eventually
        //     let mainActivity = <MyActivityFragment>application.android.foregroundActivity;

        //     mainActivity.updatePushId.send(mainActivity.pushToken) // use the messanger defined there. because it uses it for unregistrating there and we want only one instance
        // }
        // else if (application.ios){
        //     let delegate = <MyDelegate>application.ios.delegate;
        //     delegate.updatePushId.send(delegate.pushToken);
        // }
    }
}
