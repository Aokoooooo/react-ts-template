import * as ActionTypes from "./types";

export interface IChangeCollapsedAction {
  type: typeof ActionTypes.CHANGE_COLLAPSED;
}

export interface IChangeSpiningAction {
  type: typeof ActionTypes.CHANGE_SPINING;
}

export interface IChangeIsMobileAction {
  type: typeof ActionTypes.CHANGE_IS_MOBILE;
  payload: boolean;
}

export type LayoutActionTypes =
  | IChangeCollapsedAction
  | IChangeSpiningAction
  | IChangeIsMobileAction;

export const changeCollapsed = (): IChangeCollapsedAction => {
  return {
    type: ActionTypes.CHANGE_COLLAPSED
  };
};

export const changeSpining = (): IChangeSpiningAction => {
  return {
    type: ActionTypes.CHANGE_SPINING
  };
};

export const changeIsMobile = (payload: boolean): IChangeIsMobileAction => {
  return {
    type: ActionTypes.CHANGE_IS_MOBILE,
    payload
  };
};
