import { Component, Renderer2, OnDestroy, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy, OnInit {
  title = "angel-care";

  previousUrl: string = "";
  url: string;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    // this.renderer.addClass(document.body, "home");
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          this.renderer.removeClass(document.body, this.previousUrl);
        }
        let currentUrlSlug = event.url.slice(1);
        let bodyClass = currentUrlSlug.replace(/\//g, "-");

        if (bodyClass) {
          this.renderer.addClass(document.body, bodyClass);
        }
        this.url = bodyClass;
      }
    });
  }

  ngOnDestroy() {
    // this.renderer.removeClass(document.body, "home");
    // this.renderer.removeClass(document.body, this.url);
  }
}
