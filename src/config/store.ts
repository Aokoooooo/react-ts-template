import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store
} from "redux";
import aqua, {
  ReducerState,
  ReducerStateKeyType,
  ReducerStateValueType,
  StoreState as StoreStateType
} from "redux-aqua";
import { composeWithDevTools } from "redux-devtools-extension";
import { layoutReducer } from "../layouts/store/";
import { operationReducer as transferOperationReducer } from "../pages/transfer/operation/store";

const staticReducers = { layout: layoutReducer };
const enhancer = composeWithDevTools(applyMiddleware(aqua));
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
  if (process.env.NODE_ENV !== "development" && asyncReducers[key]) {
    console.warn(`尝试注入同名reducer: ${key}失败`);
    return;
  }
  asyncReducers[key] = reducer;
  const newReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers
  }) as Reducer<StoreState>;

  store.replaceReducer(newReducer);
};

export type StoreState = StoreStateType<RootReducerState, AsyncReducerState>;

const store = createStore(rootReducer, enhancer) as Store<StoreState>;

export default store;
