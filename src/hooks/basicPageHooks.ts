import { DependencyList, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreator, ActionType, AquaAction } from "redux-aqua";
import { StoreState } from "../config/store";

export interface IUseAfterPaginationParamsChangedConfig {
  notFetchDataOnMount: boolean;
  defaultCurrent: number;
  callback?: (current: number) => void;
}

export const useAfterPaginationParamsChanged = (
  updatePagination: (current: number) => void,
  fetchData: () => void,
  pageNo: number,
  config: IUseAfterPaginationParamsChangedConfig = {
    notFetchDataOnMount: false,
    defaultCurrent: 1
  }
) => {
  const [current, setCurrent] = useState(config.defaultCurrent);
  const [isFirstMount, setIsFirstMount] = useState(config.notFetchDataOnMount);
  const [shouldFetch, setShouldFetch] = useState(true);
  useEffect(() => {
    updatePagination(current);
    if (isFirstMount) {
      setIsFirstMount(false);
    } else if (!shouldFetch) {
      setShouldFetch(true);
    } else {
      fetchData();
    }
    if (typeof config.callback === "function") {
      config.callback(current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  useEffect(() => {
    if (pageNo === 1 && pageNo !== current) {
      setShouldFetch(false);
      setCurrent(pageNo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);
  return setCurrent;
};

export const useOnMount = (onMount: () => void) => {
  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useOnUnmount = (onUnmount: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onUnmount, []);
};

export const useOnMountAndUnmount = (callback: () => () => void) => {
  useEffect(() => {
    const onUnmount = callback();
    return onUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useOnUpdate = (
  onUpdate: () => void,
  deps: DependencyList = []
) => {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      onUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useLogger = (componentName: string, ...rest: any[]) => {
  useOnMount(() => {
    console.log(`${componentName} mounted`, ...rest);
  });

  useOnUpdate(() => {
    console.log(`${componentName} updated`, ...rest);
  });

  useOnUnmount(() => {
    console.log(`${componentName} unmounted`, ...rest);
  });
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
