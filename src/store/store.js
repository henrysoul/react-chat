import { createStore } from "redux";
import { chatReducer } from "./reducer";

export const store = createStore(chatReducer);
