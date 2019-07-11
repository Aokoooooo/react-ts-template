import { createBrowserHistory } from "history";
import { basePath } from "./systemParams";

const history = createBrowserHistory();
const oldPush = history.push;
delete history.push;
history.push = (url?: any, state?: any): void => {
  if (typeof url === "string") {
    const newUrl = `${basePath}${url}`;
    oldPush(newUrl, state);
  }
};

const oldReplace = history.replace;
delete history.replace;
history.replace = (url?: any, state?: any): void => {
  if (typeof url === "string") {
    const newUrl = `${basePath}${url}`;
    oldReplace(newUrl, state);
  }
};
export default history;
