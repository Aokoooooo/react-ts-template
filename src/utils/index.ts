import history from "../config/history";
import { basePath } from "../config/systemParams";

export const checkLocationPathname = (name: string): boolean => {
  return history.location.pathname === `${basePath}${name}`;
};
