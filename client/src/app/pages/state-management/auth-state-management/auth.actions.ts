import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "src/app/store";

@Injectable({ providedIn: "root" })
export class AuthActions {
  constructor(private ngRedux: NgRedux<AppState>) {}

  static LOG_IN: string = "LOG_IN";

  loggedIn(isLoggedIn: boolean): void {
    console.log(isLoggedIn,"ACTION LOGGEDIN");
    this.ngRedux.dispatch({
      type: AuthActions.LOG_IN,
      payload: isLoggedIn
    });
  }
}
