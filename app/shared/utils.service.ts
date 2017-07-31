import {Injectable} from "@angular/core";
/**
 * Created by promie on 06-Dec-16.
 */
@Injectable()
export class Utils{
    displayName(person: IPerson) : string{
        return person.fname +' '+ person.lname.charAt(0);
    }
}