import { tassign } from "tassign";
import { AuthActions } from "./auth.actions";
import { LoginState } from "src/app/store";

const INITIAL_STATE: LoginState = {
  isLoggedIn: false,
};

export function authReducer(state: LoginState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case AuthActions.LOG_IN:
      console.log("LOGIN", action.payload);
      return tassign(state, { isLoggedIn: action.payload });

    default:
      return state;
  }
}
