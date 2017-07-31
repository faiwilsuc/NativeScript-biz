// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as application from 'application';
import './polyfills'
import 'globals';

import { AppModule } from "./app.module";

const platform = platformNativeScriptDynamic();
platform.bootstrapModule(AppModule);

declare var GMSServices: any;

if (application.ios) {
    GMSServices.provideAPIKey("AIzaSyDvuHZciWYzLECvZ7s6GUSZ7vMrFAxdy9Y");
}
//
// const settings = {
//     // Android settings
//     senderID: '1099159113333', // Android: Required setting with the sender/project number
//     notificationCallbackAndroid: function(message) { // Android: Callback to invoke when a new push is received.
//         console.log(JSON.stringify(message));
//         alert(JSON.stringify(message));
//     },
//
//     // iOS settings
//     badge: true, // Enable setting badge through Push Notification
//     sound: true, // Enable playing a sound
//     alert: true, // Enable creating a alert
//
//     // Callback to invoke, when a push is received on iOS
//     notificationCallbackIOS: function(message) {
//
//     }
// }
//
// application.on(application.launchEvent, function() {
//     console.log('launch event');
//     var pushPlugin = require('nativescript-push-notifications');
//     pushPlugin.register(settings, function(token) {
//             // if we're on android device we have the onMessageReceived function to subscribe
//             // for push notifications
//             if (pushPlugin.onMessageReceived) {
//                 pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
//             }
//             alert(token);
//         }
//         , function(error){
//             console.log(error);
//         });
// });