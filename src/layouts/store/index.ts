import { createReducer, getActionCreatorWithPrefix } from "redux-aqua";

const creator = getActionCreatorWithPrefix("LAYOUT");
export const changeCollapsed = creator.createAction("CHANGE_COLLAPSED");
export const changeSpining = creator.createAction("CHANGE_SPINING");
export const changeIsMobile = creator.createStandardAction<boolean>(
  "CHANGE_IS_MOBILE"
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
