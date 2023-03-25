// 设置cookie的工具
import Cookies from "js-cookie";

const TokenKey = "mental_view_v2_token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
