import { SET_AUTH_SUCSESS, LOGOUT } from "../actions/actionTypes";
import { clearDocuments } from "./actionDocument";

export function auth(login, password) {
  return async (dispatch) => {
    try {
      localStorage.setItem("login", login);
      localStorage.setItem("password", password);
      dispatch(setAuthSuccsess(login, password));
    } catch (e) {
      console.log(e);
    }
  };
}

export function logout(login, password) {
  return async (dispatch) => {
    try {
      localStorage.clear();
      dispatch(setLogout());
      dispatchEvent(clearDocuments());
    } catch (e) {
      console.log(e);
    }
  };
}

export function restoreStorage() {
  return async (dispatch) => {
    try {
      if (
        localStorage.getItem("login") !== null &&
        localStorage.getItem("password") !== null
      ) {
        let login = localStorage.getItem("login");
        let password = localStorage.getItem("password");
        dispatch(setAuthSuccsess(login, password));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function setAuthSuccsess(login, password) {
  return {
    type: SET_AUTH_SUCSESS,
    login,
    password,
  };
}

export function setLogout(login, password) {
  return {
    type: LOGOUT,
  };
}
