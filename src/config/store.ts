import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { layoutReducer } from "../layouts/store/";
import { operationReducer as transferOperationReducer } from "../pages/transfer/operation/store";

const staticReducers = { layout: layoutReducer };
const enhancer = composeWithDevTools(applyMiddleware(thunk));
let rootReducer = combineReducers(staticReducers);
const store = createStore(rootReducer, enhancer);
export type RootReducerType = ReturnType<typeof rootReducer>;

export interface IAsyncReducers {
  transferOperation: typeof transferOperationReducer;
}
export type AsyncReducersKeyType = keyof IAsyncReducers;
export type AsyncReducersValueType = IAsyncReducers[AsyncReducersKeyType];
export type AsyncReducerType = {
  [K in AsyncReducersKeyType]: ReturnType<IAsyncReducers[K]>;
};
const asyncReducers: Partial<IAsyncReducers> = {};

export default store;

export const injectReducer = (
  key: AsyncReducersKeyType,
  reducer: AsyncReducersValueType
) => {
  if (asyncReducers[key]) {
    console.warn(`尝试注入同名reducer: ${key}失败`);
    return;
  }
  asyncReducers[key] = reducer;
  rootReducer = createReducer(asyncReducers);
  store.replaceReducer(rootReducer);
};

const createReducer = (extraReducers: any): any => {
  return combineReducers({ ...staticReducers, ...extraReducers });
};

export type StoreStateType = RootReducerType & AsyncReducerType;
