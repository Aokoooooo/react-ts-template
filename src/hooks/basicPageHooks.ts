import { useEffect } from "react";

export const useOnMount = (onMount: () => void) => {
  useEffect(() => {
    onMount();
  }, []);
};

export const useOnUnmount = (onUnmount: () => void) => {
  useEffect(() => {
    onUnmount();
  }, []);
};
