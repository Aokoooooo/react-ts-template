import { applyMiddleware, combineReducers, createStore, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { layoutReducer } from "../layouts/store/layoutReducer";

const staticReducers = { layout: layoutReducer };
const enhancer = composeWithDevTools(applyMiddleware(thunk));
let rootReducer = combineReducers(staticReducers);
const store = createStore(rootReducer, enhancer);

const asyncReducers: any = {};

export default store;

export const injectReducer = (key: string, reducer: Reducer) => {
  if (asyncReducers[key]) {
    console.warn(`尝试注入同名reducer: ${key}失败`);
    return;
  }
  asyncReducers[key] = reducer;
  rootReducer = createReducer(asyncReducers);
  store.replaceReducer(rootReducer);
};

const createReducer = (extraReducers: any): Reducer => {
  return combineReducers({ ...staticReducers, ...extraReducers });
};

export type StoreStateType = ReturnType<typeof rootReducer>;
