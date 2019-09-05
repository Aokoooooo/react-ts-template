import {
  ReducerState,
  ReducerStateKeyType,
  ReducerStateValueType,
  StoreState as StoreStateType
} from "aqua-actions";
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

// tslint:disable-next-line: interface-over-type-literal
export type AsyncReducer = {
  transferOperation: typeof transferOperationReducer;
};
export type RootReducerState = ReducerState<typeof staticReducers>;
export type AsyncReducerState = ReducerState<AsyncReducer>;
const asyncReducers: Partial<AsyncReducer> = {};

export const injectReducer = (
  key: ReducerStateKeyType<AsyncReducer>,
  reducer: ReducerStateValueType<AsyncReducer>
) => {
  if (asyncReducers[key]) {
    console.warn(`尝试注入同名reducer: ${key}失败`);
    return;
  }
  asyncReducers[key] = reducer;
  const newReducer = createReducer(asyncReducers);
  store.replaceReducer(newReducer);
};

export type StoreState = StoreStateType<RootReducerState, AsyncReducerState>;

const createReducer = (asyncReducers: Partial<AsyncReducer>) => {
  return combineReducers({ ...staticReducers, ...asyncReducers }) as Reducer<
    StoreState
  >;
};

const store = createStore(rootReducer, enhancer) as Store<StoreState>;

export default store;
