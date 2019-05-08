import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { BehaviorSubject } from "rxjs";
import { mergeMap } from "rxjs/operators";

interface IMyStore extends Store<any> {
  asyncReducers?: any;
}

const staticReducers = {};
const staticEpics = {};
const epic$ = new BehaviorSubject(combineEpics(staticEpics));
const rootEpic: Epic = (action$: any, state$: any) =>
  epic$.pipe(mergeMap((epic: any) => epic(action$, state$)));

const epicMiddleware = createEpicMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(epicMiddleware));

// tslint:disable-next-line:no-empty
const store: IMyStore = createStore(() => {}, enhancer);
store.asyncReducers = {};

// epicMiddleware.run(rootEpic);

export default store;

export const injectEpic = (key: string, epic: Epic) => {
  epic$.next(epic);
};

export const injectReducer = (key: string, reducer: Reducer) => {
  if (store.asyncReducers[key]) {
    console.warn(`尝试注入同名reducer: ${key}失败`);
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

const createReducer = (asyncReducers: Reducer) => {
  return combineReducers({ ...staticReducers, ...asyncReducers });
};
