import { Component, OnInit, Renderer2, OnDestroy } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "src/app/store";
import { Sitter } from "src/app/entities/sitter";
import { SitterActions } from "../state-management/sitters-state-management/sitter.actions";

@Component({
  selector: "app-sitters",
  templateUrl: "./sitters.component.html",
  styleUrls: ["./sitters.component.scss"]
})
export class SittersComponent implements OnInit, OnDestroy {
  allSitters: Sitter[];
  isLoading: boolean;

  static allSitters: Sitter[] = [];

  constructor(
    private renderer: Renderer2,
    private ngRedux: NgRedux<AppState>,
    private sitterActions: SitterActions
  ) {}
  

  ngOnInit() {
    this.sitterActions.getSitters();
    this.ngRedux
      .select(state => state.sitters) //subscribe to sitters from the store
      .subscribe(res => {
        // console.log(res);
        this.allSitters = res.sitters;
        //add the sitters to the local scope(allSitters) when the sitters are retrieved 
        SittersComponent.allSitters = res.sitters;
        this.isLoading = res.isLoading;
      });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "sitters");
  }
}
