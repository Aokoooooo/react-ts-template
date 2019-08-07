import { LayoutActionTypes } from "./layoutAction";
import * as ActionTypes from "./types";

export interface ILayoutState {
  collapsed: boolean;
  spining: boolean;
  isMobile: boolean;
}

const initState: ILayoutState = {
  collapsed: false,
  spining: false,
  isMobile: false
};

export const layoutReducer = (
  state: ILayoutState = initState,
  action: LayoutActionTypes
): ILayoutState => {
  switch (action.type) {
    case ActionTypes.CHANGE_COLLAPSED:
      return { ...state, collapsed: !state.collapsed };
    case ActionTypes.CHANGE_SPINING:
      return { ...state, spining: !state.spining };
    case ActionTypes.CHANGE_IS_MOBILE:
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
};
