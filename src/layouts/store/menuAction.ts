export const CHANGE_COLLAPSED = "MENU_CHANGE_COLLAPSED";

export interface IChangeCollapsedAction {
  type: typeof CHANGE_COLLAPSED;
}

export type MenuActionTypes = IChangeCollapsedAction;

export const changeCollapsed = (): IChangeCollapsedAction => {
  return {
    type: CHANGE_COLLAPSED
  };
};
