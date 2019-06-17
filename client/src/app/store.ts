import { routerReducer } from "@angular-redux/router";
import { combineReducers } from "redux";
import { Sitter } from "./entities/sitter";
import { sittersReducer } from "./pages/state-management/sitters-state-management/sitters.reducer";
import { authReducer } from "./pages/state-management/auth-state-management/auth.reducer";

export class LoginState {
  isLoggedIn: boolean;
}

export class SitterState {
  sitters: Sitter[];
  isLoading: boolean;
}
export class AppState {
  sitters?: SitterState;
  login?: LoginState;
}
export const rootReducer = combineReducers<AppState>({
  sitters: sittersReducer,
  login: authReducer,

  router: routerReducer
} as any);
