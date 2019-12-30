import { useOnUpdate } from "aqua-hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreator, ActionType, AquaAction } from "redux-aqua";
import { StoreState } from "../config/store";

export interface IUseAfterPaginationParamsChangedConfig {
  notFetchDataOnMount?: boolean;
  onPageChange?: (current: number) => void;
}

export const useAfterPaginationParamsChanged = (
  fetchData: (current: number) => void,
  pageNo: number,
  config: IUseAfterPaginationParamsChangedConfig = {}
) => {
  const [current, setCurrent] = useState(pageNo);
  const [isFirstMount, setIsFirstMount] = useState(
    Boolean(config.notFetchDataOnMount)
  );

  useOnUpdate(() => {
    if (typeof config.onPageChange === "function") {
      config.onPageChange(current);
    }

    if (isFirstMount) {
      setIsFirstMount(false);
    } else {
      fetchData(current);
    }
  }, [current]);

  return setCurrent;
};

interface IUseActionsActionCreators {
  [key: string]:
    | ActionCreator
    | ((...args: any[]) => AquaAction<StoreState, any, undefined, ActionType>);
}

export const useActions = <T extends IUseActionsActionCreators>(
  actionCreators: T,
  deps: any[] = []
) => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ...deps]);
};

export const useSelector = <TSelected = any>(
  selector: (state: StoreState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => {
  return useReduxSelector<StoreState, TSelected>(selector, equalityFn);
};
