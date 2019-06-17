import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { SittersApiService } from "src/app/services/sitters-api.service";
import { AppState } from "src/app/store";
import { Sitter } from "src/app/entities/sitter";

@Injectable({ providedIn: "root" })
export class SitterActions {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private api: SittersApiService
  ) {}

  static GET_SITTERS_SUCCESS: string = "GET_SITTERS_SUCCESS";
  static GET_SITTERS_FAILURE: string = "GET_SITTERS_FAILURE";
  static GET_SITTERS_LOADING: string = "GET_SITTERS_LOADING";

  static CREATE_SITTER_SUCCESS: string = "CREATE_SITTER_SUCCESS";
  static CREATE_SITTER_FAILURE: string = "CREATE_SITTER_FAILURE";
  static CREATE_SITTER_LOADING: string = "CREATE_SITTER_LOADING";

  static UPDATE_SITTER_SUCCESS: string = "UPDATE_SITTER_SUCCESS";
  static UPDATE_SITTER_FAILURE: string = "UPDATE_SITTER_FAILURE";
  static UPDATE_SITTER_LOADING: string = "CREATE_SITTER_LOADING";

  static GET_SITTER: string = "GET_SITTER";

  static DELETE_SITTER: string = "DELETE_SITTER";

  getSitters() {
    this.ngRedux.dispatch({ type: SitterActions.GET_SITTERS_LOADING });
    this.api.getSitters().subscribe(
      result => {
        this.ngRedux.dispatch({
          type: SitterActions.GET_SITTERS_SUCCESS,
          payload: result
        });
      },
      error => {
        this.ngRedux.dispatch({
          type: SitterActions.GET_SITTERS_LOADING,
          payload: error
        });
      }
    );
  }

  getSitter(id): void {
    this.api.getSitter(id).subscribe(
      dataFromWs => {
        this.ngRedux.dispatch({
          type: SitterActions.GET_SITTER,
          payload: dataFromWs
        });
        // this.router.navigate(["/portal/display-auctions"]);
      },
      whatever => {
        console.log(whatever, "error");
        // this.ngRedux.dispatch({
        //   type: SitterActions.UPDATE_SITTER_FAILURE,
        //   payload: whatever
        // });
      }
    );
  }

  createNewSitter(sitter: Sitter): void {
    this.ngRedux.dispatch({
      type: SitterActions.CREATE_SITTER_LOADING
    });

    this.api.createSitter(sitter).subscribe(
      dataFromWs => {
        console.log("sitter from api", sitter);
        console.log("data from web service", dataFromWs);

        this.ngRedux.dispatch({
          type: SitterActions.CREATE_SITTER_SUCCESS,
          payload: dataFromWs
        });
        // this.router.navigate(["/portal/display-auctions"]);
      },
      whatever => {
        this.ngRedux.dispatch({
          type: SitterActions.CREATE_SITTER_FAILURE,
          payload: whatever
        });
      }
    );
  }

  updateSitter(sitter: Sitter): void {
    this.api.updateSitter(sitter).subscribe(
      dataFromWs => {
        this.ngRedux.dispatch({
          type: SitterActions.UPDATE_SITTER_SUCCESS,
          payload: dataFromWs
        });
        // this.router.navigate(["/portal/display-auctions"]);
      },
      whatever => {
        console.log(whatever, "error");
        // this.ngRedux.dispatch({
        //   type: SitterActions.UPDATE_SITTER_FAILURE,
        //   payload: whatever
        // });
      }
    );
  }

  deleteSitter(id: string) {
    this.api.deleteIssue(id).subscribe(
      () => {
        this.ngRedux.dispatch({
          type: SitterActions.DELETE_SITTER,
          payload: id
        });
      },
      whatever => {
        console.log(whatever, "error");
      }
    );
  }
}
