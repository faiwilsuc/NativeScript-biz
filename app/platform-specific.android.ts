import {setActivityCallbacks, AndroidActivityCallbacks} from "ui/frame";
import {TnsPushWoosh} from '@zapsod/ns-pushwoosh';
import * as application from "tns-core-modules/application";
import { businessMessages } from "@zapsod/common/lib/business-side";
import {platformCommon} from "./platform-common"

declare var com: any;
@Interfaces([com.pushwoosh.fragment.PushEventListener])
@JavaProxy("com.tns.MyActivity")
export class MyActivityFragment extends android.support.v4.app.FragmentActivity implements TnsPushWoosh.fragment.PushEventListener{
    private _callbacks: AndroidActivityCallbacks;
    public pushToken: string;

    protected onNewIntent(intent): void {
        super.onNewIntent(intent);
        TnsPushWoosh.fragment.PushFragment.onNewIntent(this, intent);
    }

    protected onCreate(savedInstanceState: android.os.Bundle): void {
        java.util.logging.Logger.getLogger(java.util.logging.Logger.GLOBAL_LOGGER_NAME).setLevel(java.util.logging.Level.ALL)

        if (!this._callbacks) {
            setActivityCallbacks(this);
        }

        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
        TnsPushWoosh.fragment.PushFragment.init(this);
    }

    public  doOnRegistered(registrationId)
    {
        console.info("Registered for pushes: " + registrationId);
        this.pushToken = registrationId;
    }

    public  doOnRegisteredError(errorId)
    {
        console.error("Failed to register for pushes: " + errorId);
    }

    public  doOnMessageReceive(message)
    {
        console.info("Notification opened:" + message);
    }

    public  doOnUnregistered(message)
    {
        console.warn("Unregistered from pushes: " + message);
        platformCommon.updatePushId.send({token: null});
    }

    public  doOnUnregisteredError(errorId)
    {
        console.error("Failed to unregister " + errorId);
    }
}

// export class MyActivity extends android.app.Activity  {
//     private _callbacks: AndroidActivityCallbacks;
//     private mBroadcastReceiver = new BaseRegistrationReceiver();
//     private mReceiver = new BasePushMessageReceiver();

//     protected onCreate(savedInstanceState: android.os.Bundle): void {
//         if (!this._callbacks) {
//             setActivityCallbacks(this);
//         }

//         this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
//     }

//     protected onSaveInstanceState(outState: android.os.Bundle): void {
//         this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
//     }

//     protected onStart(): void {
//         this._callbacks.onStart(this, super.onStart);
//     }

//     protected onStop(): void {
//         this._callbacks.onStop(this, super.onStop);
//     }

//     protected onDestroy(): void {
//         this._callbacks.onDestroy(this, super.onDestroy);
//     }

//     protected onPause(): void{
//         super.onPause();
//         this.registerReceivers();
//     }

//     protected onResume(): void{
//         super.onResume();
//         this.unregisterReceivers();
//     }

//     public onBackPressed(): void {
//         this._callbacks.onBackPressed(this, super.onBackPressed);
//     }

//     public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
//         this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
//     }

//     protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
//         this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
//     }

//     protected unregisterReceivers(){
//         //Unregister receivers on pause
//         try
//         {
//             super.unregisterReceiver(this.mReceiver as any);
//         }
//         catch (e)
//         {
//             // pass.
//         }

//         try
//         {
//             super.unregisterReceiver(this.mBroadcastReceiver as any);
//         }
//         catch (e)
//         {
//             //pass through
//         }
//     }

//     protected registerReceivers(){
//         const IntentFilter = new android.content.IntentFilter(application.android.packageName+".action.PUSH_MESSAGE_RECEIVE");
//         application.android.registerBroadcastReceiver(application.android.packageName+".permission.C2D_MESSAGE", (ctxt, intent)=>{
//             console.log("pushmsgreceiverr", ctxt, intent);
//         })
//         console.log('TnsPushWoosh.PushManager', TnsPushWoosh.PushManager.REGISTER_BROAD_CAST_ACTION)
//         application.android.registerBroadcastReceiver(application.android.packageName+"." + TnsPushWoosh.PushManager.REGISTER_BROAD_CAST_ACTION , (ctxt, intent)=>{
//             console.log("pushmsgreceiver", ctxt, intent);
//         })
//     }
// }