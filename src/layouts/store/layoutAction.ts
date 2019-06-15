export const CHANGE_COLLAPSED = "CHANGE_COLLAPSED";
export const CHANGE_SPINING = "CHANGE_SPINING";

export interface IChangeCollapsedAction {
  type: typeof CHANGE_COLLAPSED;
}

export interface IChangeSpiningAction {
  type: typeof CHANGE_SPINING;
}

export type LayoutActionTypes = IChangeCollapsedAction & IChangeSpiningAction;

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
