/**
 * Created by promie on 08-Dec-16.
 */
import {Component} from "@angular/core";
import {Business} from "../../models/business/Business"
/**
 * Created by promie on 08-Dec-16.
 */
var template = `    
<StackLayout style="padding: 10px 0">
    <Label text="ענית על 100% מהבקשות שנשלחו אליך"></Label>
    <StackLayout orientation="horizontal" horizontalAlignment="right">
    <Label text="בקשות שנשלחו" class="font-weight-bold"></Label>
    <Label text=" 0 " style="margin-right:5px;"></Label>
    <Label text="בקשות שאושרו"  class="font-weight-bold"></Label>
    <Label text=" 0 "></Label>
</StackLayout>`

@Component({
    selector: "workspace-stats",
    styles: ["*{horizontal-align: center}"],
    template: template
})
export class WorkspaceStatsComponent{
    biz : Business = {
        owner : {fname: 'מתן', lname: 'כהן'},
        address: {city: 'תל אביב', street:'אליהו ספיר', num: '42'},
        categories: [{id: '1', name: 'טכנאי'}],
        reviewSummary: {numOfRaters: 18, score:4.5, topReviews:[
            {id: '1', content: 'מצוין', reviewer: {lname: 'שושני', fname: 'דניאל'}, date: new Date()}]}
    }
}