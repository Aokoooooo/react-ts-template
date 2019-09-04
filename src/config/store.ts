import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { layoutReducer } from "../layouts/store/";
import { operationReducer as transferOperationReducer } from "../pages/transfer/operation/store";

const staticReducers = { layout: layoutReducer };
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const rootReducer = combineReducers(staticReducers);
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

export const injectReducer = (
  key: AsyncReducersKeyType,
  reducer: AsyncReducersValueType
) => {
  if (asyncReducers[key]) {
    console.warn(`尝试注入同名reducer: ${key}失败`);
    return;
  }
  asyncReducers[key] = reducer;
  const newReducer = createReducer(asyncReducers);
  store.replaceReducer(newReducer);
};

const createReducer = (asyncReducers: Partial<IAsyncReducers>) => {
  return combineReducers({ ...staticReducers, ...asyncReducers }) as Reducer<
    StoreStateType
  >;
};

export type StoreStateType = {
  [K in keyof RootReducerType | keyof AsyncReducerType]: (RootReducerType &
    AsyncReducerType)[K];
};

const store = createStore(rootReducer, enhancer) as Store<StoreStateType>;

export default store;
