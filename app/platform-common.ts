
import { businessMessages } from "@zapsod/common/lib/business-side";

export namespace platformCommon{
    // For updating pushId

    export function init(){
    updatePushId = businessMessages.updatePushId.clientSide();

}
    export var updatePushId
    export var pushToken: string
}