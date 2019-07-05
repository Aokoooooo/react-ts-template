export const CHANGE_COLLAPSED = "LAYOUT_CHANGE_COLLAPSED";
export const CHANGE_SPINING = "LAYOUT_CHANGE_SPINING";
export const CHANGE_IS_MOBILE = "LAYOUT_CHANGE_IS_MOBILE";

export interface IChangeCollapsedAction {
  type: typeof CHANGE_COLLAPSED;
}

export interface IChangeSpiningAction {
  type: typeof CHANGE_SPINING;
}

export interface IChangeIsMobileAction {
  type: typeof CHANGE_IS_MOBILE;
  payload: boolean;
}

export type LayoutActionTypes =
  | IChangeCollapsedAction
  | IChangeSpiningAction
  | IChangeIsMobileAction;

export const changeCollapsed = (): IChangeCollapsedAction => {
  return {
    type: CHANGE_COLLAPSED
  };
};

export const changeSpining = (): IChangeSpiningAction => {
  return {
    type: CHANGE_SPINING
  };
};

export const changeIsMobile = (payload: boolean): IChangeIsMobileAction => {
  return {
    type: CHANGE_IS_MOBILE,
    payload
  };
};
