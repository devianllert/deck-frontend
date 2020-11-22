import { setCookie } from "../utils/cookie";

export const getMe = () => {
  if (process.browser) {
    return localStorage?.getItem("userId");
  }

  return undefined;
};

export const login = (userId: string) => {
  localStorage?.setItem("userId", userId);

  setCookie("userId", userId);
};

export const logout = () => {
  localStorage?.removeItem("userId");

  setCookie("userId", "");
};
