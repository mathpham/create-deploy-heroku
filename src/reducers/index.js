import { combineReducers } from "redux";
import authLevel from "./isLogin"

const allReducers = combineReducers({authLevel});

export default allReducers;