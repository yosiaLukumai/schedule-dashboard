import { Screen } from "quasar";

// export function screen() {
//   return Screen;
// }

export const max900 = () => (Screen.width > 900) ? true : false;
export const max1000 = () => (Screen.width > 1000) ? true : false;
export const max1024 = () => (Screen.width > 1024) ? true : false;
export const max600 = () => (Screen.width > 600) ? true : false;
export const min = () => (Screen.width > 400) ? true : false;
export const max350 = () => (Screen.width > 350) ? true : false;
export const max700 = () => (Screen.width > 700) ? true : false;
export const max920 = () => (Screen.width > 920) ? true : false;

export default Screen;

