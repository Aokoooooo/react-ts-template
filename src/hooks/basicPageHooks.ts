import {
  DependencyList,
  EffectCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import { useDispatch } from "react-redux";
import { AnyAction, bindActionCreators } from "redux";

export const useOnMount = (onMount: EffectCallback) => {
  useEffect(() => {
    onMount();
  }, []);
};

export const useOnUnmount = (onUnmount: () => void) => {
  useEffect(() => onUnmount, []);
};

export const useOnMountAndUnmount = (
  onMount: EffectCallback,
  onUnmount?: () => void
) => {
  if (!onUnmount) {
    useEffect(onMount, []);
  } else {
    useEffect(() => {
      onMount();
      return onUnmount;
    }, []);
  }
};

export const useOnUpdate = (
  onUpdate: () => void,
  deps: DependencyList = []
) => {
  const isFirst = useRef(true);

  useEffect(
    isFirst.current
      ? () => {
          isFirst.current = false;
        }
      : onUpdate,
    deps
  );
};

export const useLogger = (componentName: string, ...rest: any) => {
  useOnMountAndUnmount(() => {
    console.log(`${componentName} mounted`, ...rest);
  });

  useOnUpdate(() => {
    console.log(`${componentName} updated`, ...rest);
  });
};

export const useActions = (actions: AnyAction, deps = []) => {
  const dispatch = useDispatch();
  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(action => bindActionCreators(action, dispatch));
    }
    return bindActionCreators(actions, dispatch);
  }, [dispatch, ...deps]);
};
