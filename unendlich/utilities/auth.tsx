import { open } from "sqlite";
import { createContext, useContext } from "react";
import Axios from "./axios";

export type credentials = {
  expiry: string;
  token: string;
  user: { username: string };
};

const TOKEN_EXPIRATION = "token_expiration";
const TOKEN = "unendlich_token";
export async function setCredentials(
  id: string,
  data: credentials,
  password: string
) {
  localStorage.setItem(id, JSON.stringify({ ...data, password: password }));
}

export function getCredentials(
  id: string
): (credentials & { password: string }) | null {
  let tmp = localStorage.getItem(id);

  if (tmp) return JSON.parse(tmp);

  return null;
}

export function isAuthenticated(request: any) {
  console.log("requeset is being authenticatd");
  console.log(request);
  // const tmp = localStorage.getItem(id);
  return true;
}

export const UserContext = createContext<
  (credentials & { password: string }) | undefined
>(undefined);

export const useUser = () => {
  return useContext(UserContext);
};
