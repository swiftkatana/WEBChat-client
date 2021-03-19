import { createHashHistory } from "history";
let history = createHashHistory();

export const changeURL = (url) => {
  if (history.location.pathname !== url) {
    history.push(url);
  }
};

export default history;
