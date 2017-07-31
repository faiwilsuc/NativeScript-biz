import { Component, OnInit } from '@angular/core';
import {Page} from "ui/page";
import {RouterExtensions} from "nativescript-angular";

@Component({
	selector: 'intro',
	templateUrl: 'pages/intro/intro.component.html',
	styleUrls: ["pages/action-bar.css",'pages/intro/intro.component.css']
})

export class IntroComponent implements OnInit {

	constructor(private page :Page, private router: RouterExtensions) { 
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	goLogin(){
		this.router.navigate(["/login", {clearHistory: true}])
	}
}