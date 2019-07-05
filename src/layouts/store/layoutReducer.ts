import {
  CHANGE_COLLAPSED,
  CHANGE_IS_MOBILE,
  CHANGE_SPINING,
  LayoutActionTypes
} from "./layoutAction";
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
  state = initState,
  action: LayoutActionTypes
): ILayoutState => {
  switch (action.type) {
    case CHANGE_COLLAPSED:
      return { ...state, collapsed: !state.collapsed };
    case CHANGE_SPINING:
      return { ...state, spining: !state.spining };
    case CHANGE_IS_MOBILE:
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
};
