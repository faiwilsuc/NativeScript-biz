import {IAddress} from "@zapsod/common";
/**
 * Created by promie on 05-Dec-16.
 */
export class Address{
    constructor(address: IAddress){
        if (address){
            this.city =address.city;
            this.street = address.street;
            this.num = address.num;
        }
    }
    city: string;
    street: string;
    num?: string;
    toString(){
        return Address.toString(this);
    }
    static toString(address: IAddress){
    try {
            let res = address.city;
            if (address.street) {
                res += `, ${address.street} ${address.num}`
            }
            return res;            
        }
        catch(err){
            console.warn("there is a problem parsing this address ", address)
        }
    }
}