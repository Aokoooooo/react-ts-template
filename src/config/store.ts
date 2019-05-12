import { applyMiddleware, combineReducers, createStore, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { BehaviorSubject } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { menuReducer } from "../layouts/store/menuReducer";

const staticReducers = { menu: menuReducer };
const staticEpics = {};
const epic$ = new BehaviorSubject(combineEpics(staticEpics));
const epicMiddleware = createEpicMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(epicMiddleware));
let rootReducer = combineReducers(staticReducers);
const store = createStore(rootReducer, enhancer);
const asyncReducers: any = {};

const rootEpic: Epic = (action$: any, state$: any) =>
  epic$.pipe(mergeMap((epic: any) => epic(action$, state$)));
// epicMiddleware.run(rootEpic);

export default store;

export const injectEpic = (key: string, epic: Epic) => {
  epic$.next(epic);
};

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
