
import { Time, TimeUnspecified, TimeImmediate, TimeKind, } from "@zapsod/common"; 
export function timeFactory(time: Time): Time{
    switch (+time.kind){
        case TimeKind.Unspecified:
            return new TimeUnspecified();
        case TimeKind.Immediate:
            return new TimeImmediate();
        default:
            console.error('default in timefactory')
    }
}
