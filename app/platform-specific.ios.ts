import * as application from "application";
import {TnsPushWoosh} from '@zapsod/ns-pushwoosh';
import pushManager = TnsPushWoosh.PushNotificationManager;
import { ios } from "application";
import {platformCommon} from "./platform-common"

export class MyDelegate extends UIResponder implements UIApplicationDelegate{
    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions): boolean {

        pushManager.delegate = this;
        UNUserNotificationCenter.currentNotificationCenter().delegate = pushManager.notificationCenterDelegate;

        console.log("applicationWillFinishLaunchingWithOptions: " + launchOptions);
        pushManager.handlePushReceived(launchOptions);
        pushManager.sendAppOpen();
        pushManager.registerForPushNotifications();
        return true;
    }

    onPushAccepted(pushManager, withNotification, onStart){
        console.log("pushaccepted", withNotification)
    }

    didRegisterForRemoteNotificationsWithDeviceToken(deviceToken) {
        platformCommon.pushToken = deviceToken;
        pushManager.handlePushRegistration(deviceToken);
    }

    didFailToRegisterForRemoteNotificationsWithError(error){
        pushManager.handlePushRegistrationFailure()
    }

    didReceiveRemoteNotification(userInfo){
        pushManager.handlePushReceived(userInfo);
    }
}