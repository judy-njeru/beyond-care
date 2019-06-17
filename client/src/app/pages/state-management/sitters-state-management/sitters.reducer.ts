import { tassign } from "tassign";
import { SitterState } from "src/app/store";
import { SitterActions } from "./sitter.actions";

const INITIAL_STATE: SitterState = {
  sitters: [],
  isLoading: false
};

export function sittersReducer(
  state: SitterState = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case SitterActions.GET_SITTERS_LOADING:
      return tassign(state, { isLoading: true });

    case SitterActions.GET_SITTERS_SUCCESS:
      return tassign(state, { sitters: action.payload, isLoading: false });

    case SitterActions.GET_SITTERS_FAILURE:
      return tassign(state, { isLoading: false });
    
    //Get Sitter
    case SitterActions.GET_SITTER:
      return tassign(state, { sitters: action.payload, isLoading: false });

    //Add Sitters
    case SitterActions.CREATE_SITTER_LOADING:
      return tassign(state, { isLoading: true });

    case SitterActions.CREATE_SITTER_SUCCESS:
      let newSitters = [...state.sitters, action.payload];
      let newState = tassign(state, { sitters: newSitters });
      return newState;

    case SitterActions.CREATE_SITTER_FAILURE:
      return tassign(state, { isLoading: true });

    //Update Sitter

    case SitterActions.UPDATE_SITTER_SUCCESS:
      let updatedSitterState = [...state.sitters];
      let index = updatedSitterState.findIndex(
        sitter => sitter.id === action.payload.id
      );
      updatedSitterState[index] = action.payload;
      return tassign(state, { sitters: updatedSitterState });

    //Delete Sitter
    case SitterActions.DELETE_SITTER:
      // console.log(action.payload);
      let newProductsAfterDelete = state.sitters.filter(
        sitter => sitter.id !== action.payload
      );
      return tassign(state, { sitters: newProductsAfterDelete });

    default:
      return state;
  }
}
