import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "src/app/store";
import { Sitter } from "src/app/entities/sitter";
import { SitterActions } from "../state-management/sitters-state-management/sitter.actions";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  allSitters: Sitter[];
  locations: string[] = [];
  myControl = new FormControl();
  options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;

  constructor(
    private nav: NavbarService,
    private sitterActions: SitterActions,
    private ngRedux: NgRedux<AppState>
  ) {}
  ngOnInit() {
    this.nav.show();
    this.sitterActions.getSitters();
    this.ngRedux
      .select(state => state.sitters) //subscribe to sitters from the store
      .subscribe(res => {
        this.allSitters = res.sitters;
      });
  }
}
