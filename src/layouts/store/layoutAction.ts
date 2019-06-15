export const CHANGE_COLLAPSED = "CHANGE_COLLAPSED";
export const CHANGE_SPINING = "CHANGE_SPINING";

export interface IChangeCollapsedAction {
  type: typeof CHANGE_COLLAPSED;
}

export interface IChangeSpining {
  type: typeof CHANGE_SPINING;
}

export type LayoutActionTypes = IChangeCollapsedAction & IChangeSpining;

export const changeCollapsed = (): IChangeCollapsedAction => {
  return {
    type: CHANGE_COLLAPSED
  };
};

export const changeSpining = (): IChangeSpining => {
  return {
    type: CHANGE_SPINING
  };
};
