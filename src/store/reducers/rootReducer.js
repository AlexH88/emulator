import { combineReducers } from "redux";
import documentReducer from "./documentReducer";
import authReducer from "./authReducer";

export default combineReducers({
  documents: documentReducer,
  auth: authReducer,
});
