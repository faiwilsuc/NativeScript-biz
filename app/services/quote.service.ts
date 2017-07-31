import {Injectable} from "@angular/core";
import { OfferBizView } from "@zapsod/common/lib/business-side";
/**
 * Created by promie on 06-Dec-16.
 */
@Injectable()
export class QuoteService{
    offer: OfferBizView;
    setOffer(off){
        this.offer = off;

    }

    getOffer(){
        return this.offer;
    }
}