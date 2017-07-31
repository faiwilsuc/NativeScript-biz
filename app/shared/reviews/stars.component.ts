/**
 * Created by promie on 01-Dec-16.
 */
import { Component } from "@angular/core";

let template = `
<GridLayout id="containter" columns="auto" rows="auto"style="">
    <Label id='stars' text="★★★★" ></Label>
</GridLayout>
`
@Component({
    selector: "stars-rating",
    styles: ['#stars{color:gold; background-color: black; border-radius:10%;padding:0 5px;} #containter{horizontal-align:right ;}'],
    template: template
})
export class StarsRatingComponent {

}
