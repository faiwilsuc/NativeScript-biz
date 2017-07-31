/**
 * Created by promie on 28-Nov-16.
 */
import { DemandListComponent } from "./pages/demand-list/demand-list.component";
import {LoginComponent} from "./pages/login/login.component";
import {IntroComponent} from "./pages/intro/intro.component";
import {MainComponent} from "./pages/main/main.component";
import { RootComponent } from "./root.component";
import { SetRadiusComponent } from "./pages/login/set-radius.component";
import { QuoteComponent } from "./pages/demand-list/quote.component";

export const routes = [
    { path: "", component: RootComponent },
    { path: "login", component: LoginComponent },
    { path: "intro", component: IntroComponent },
    { path: "set-radius", component: SetRadiusComponent },
    { path: "main", component: MainComponent },
    { path: "beeper", component: DemandListComponent },
    { path: "quote", component: QuoteComponent },
];

export const navigatableComponents = [
    DemandListComponent,
    MainComponent,
    LoginComponent,
    IntroComponent,
    QuoteComponent
];