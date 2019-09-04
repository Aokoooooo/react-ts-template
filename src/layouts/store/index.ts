import {
  createAction,
  createReducer,
  createStandardAction
} from "aqua-actions";

export const changeCollapsed = createAction("LAYOUT_CHANGE_COLLAPSED");
export const changeSpining = createAction("LAYOUT_CHANGE_SPINING");
export const changeIsMobile = createStandardAction<boolean>(
  "LAYOUT_CHANGE_IS_MOBILE"
);

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

export const layoutReducer = createReducer(initState)
  .handleAction(changeCollapsed, state => {
    return { ...state, collapsed: !state.collapsed };
  })
  .handleAction(changeSpining, state => {
    return { ...state, spining: !state.spining };
  })
  .handleAction(changeIsMobile, (state, action) => {
    return { ...state, isMobile: action.payload };
  })
  .build();
