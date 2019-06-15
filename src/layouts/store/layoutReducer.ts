import {
  CHANGE_COLLAPSED,
  CHANGE_SPINING,
  LayoutActionTypes
} from "./layoutAction";
export interface ILayoutState {
  collapsed: boolean;
  spining: boolean;
}
const initState: ILayoutState = {
  collapsed: false,
  spining: false
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
    default:
      return state;
  }
};
