import { createStore } from "redux";
import dispatch from "./reducer";

const store = createStore(dispatch);

export default store;