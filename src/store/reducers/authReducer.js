import { SET_AUTH_SUCSESS, LOGOUT } from "../actions/actionTypes";

const initialState = {
  login: null,
  password: null,
};

export default function resultTestReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_SUCSESS:
      return {
        ...state,
        login: action.login,
        password: action.password,
      };

    case LOGOUT:
      return {
        ...state,
        login: null,
        password: null,
      };

    default:
      return state;
  }
}
