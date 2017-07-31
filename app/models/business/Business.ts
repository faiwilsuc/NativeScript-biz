import {Address} from "../common/Address"
/**
 * Created by promie on 05-Dec-16.
 */
export class Business{
    owner : IPerson;
    categories : Array<ICategory>;
    reviewSummary : ReviewSummary;
    address : Address;
}