import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { RootComponent } from "./root.component";
import { routes, navigatableComponents } from "./app.routing";
import {DemandListItemComponent} from "./pages/demand-list/item.component";
import {LoginComponent} from "./pages/login/login.component";
import {StarsRatingComponent} from "./shared/reviews/stars.component";
import {WorkspaceComponent} from "./pages/workspace/workspace.component";
import {BusinessCardComponent} from "./pages/workspace/business-card";
import {WorkspaceStatsComponent} from "./pages/workspace/workspaceStats";
import {ApplicationService} from "./services/application.service";
import {QuoteService} from "./services/quote.service";

import {QuoteComponent} from "./pages/demand-list/quote.component";
import { SetRadiusComponent } from "./pages/login/set-radius.component";
import { WorkLogComponent } from "./pages/work-log/work-log.component";
import { WorkLogItemComponent } from "./pages/work-log/work-log-item.component";

@NgModule({
    declarations: [RootComponent, LoginComponent, RootComponent, SetRadiusComponent,
        DemandListItemComponent, StarsRatingComponent,WorkspaceComponent ,
        BusinessCardComponent, WorkspaceStatsComponent, QuoteComponent, WorkLogComponent,
        WorkLogItemComponent,
        ...navigatableComponents],
    bootstrap: [RootComponent],
    entryComponents:[RootComponent, LoginComponent],
    imports: [NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)],
    providers:[ApplicationService, QuoteService ]
})
export class AppModule { }