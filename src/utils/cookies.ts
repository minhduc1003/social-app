import Cookies from "js-cookie";
interface options {
  expires: Date | number;
  domain: string;
}
let date = new Date();
date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
const cookieOptions: options = {
  expires: date,
  domain: "social-app-sooty-two.vercel.app",
};
export const saveCookie = (cookie: string) => {
  if (cookie) {
    Cookies.set("token", cookie, { ...cookieOptions });
  } else {
    Cookies.remove("token", { ...cookieOptions, path: "/" });
  }
};
export const getCookies = () => {
  return new Promise((resolve, reject) => {
    const token = Cookies.get("token");
    if (token) {
      resolve(token);
    } else {
      reject("error");
    }
  });
};
export const deleteCookies = () => {
  Cookies.remove("token", { ...cookieOptions, path: "/" });
};
