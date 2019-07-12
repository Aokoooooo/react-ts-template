import { EffectCallback, useEffect, useRef } from "react";

// tslint:disable-next-line: ban-types
export const useOnMount = (onMount: EffectCallback) => {
  useEffect(() => {
    onMount();
  }, []);
};

export const useOnUnmount = (onUnmount: () => void) => {
  useEffect(() => onUnmount, []);
};

export const useOnMountAndUnmount = (
  onMount: () => void,
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

export const useOnUpdate: typeof useEffect = (onUpdate, deps) => {
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
