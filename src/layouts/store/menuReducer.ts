import { CHANGE_COLLAPSED, MenuActionTypes } from "./menuAction";
export interface IMenuState {
  collapsed: boolean;
}
const initState: IMenuState = {
  collapsed: false
};

export const menuReducer = (
  state = initState,
  action: MenuActionTypes
): IMenuState => {
  switch (action.type) {
    case CHANGE_COLLAPSED:
      return { ...state, collapsed: !state.collapsed };
    default:
      return state;
  }
};
