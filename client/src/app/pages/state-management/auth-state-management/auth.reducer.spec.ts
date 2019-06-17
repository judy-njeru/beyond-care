import { authReducer } from "./auth.reducer";
import * as types from "./auth.actions";
import { LoginState } from "src/app/store";

var deepFreeze = require("deep-freeze");

describe("login reducer", () => {
  it("should change isLoggedIn to true", () => {
    let state = { isLoggedIn: undefined };
    deepFreeze(state);

    expect(
      authReducer(state, {
        type: types.AuthActions.LOG_IN,
        payload: true
      })
    ).toEqual({
      isLoggedIn: true
    } as LoginState);
  });
});
