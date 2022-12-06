import { AxiosRequestConfig } from "axios";

export const base_url = "http://localhost:1337/api";
export const base_config: AxiosRequestConfig<any> = {
  auth: {
    username: "root",
    password: "ath",
  },
};
