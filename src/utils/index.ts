import history from "../config/history";
import { basePath } from "../config/systemParams";

export const checkLocationPathname = (name: string): boolean => {
  return history.location.pathname === `${basePath}${name}`;
};

export const safeBack = (to?: string) => {
  if (history.length < 3) {
    history.replace("/");
  } else if (to) {
    history.replace(to);
  } else {
    history.goBack();
  }
};
