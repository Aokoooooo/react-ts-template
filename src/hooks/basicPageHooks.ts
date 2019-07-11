import { useEffect } from "react";

export const useOnMount = (onMount: () => void) => {
  useEffect(() => {
    onMount();
  }, []);
};

export const useOnUnmount = (onUnmount: () => void) => {
  useEffect(() => onUnmount, []);
};

export const useOnMountAndUnmount = (
  onMount: () => void,
  onUnmount: () => void
) => {
  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);
};
