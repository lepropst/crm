import { AxiosResponse } from "axios";
import Model from "./Model";
export const base_url = "http://localhost:8000/api/unendlich";
export const common_config = {
  auth: { username: "root", password: "ath" },
};
export function retrieveResults(
  response: AxiosResponse,
  m: (m: Map<String, String>) => Model
) {
  return response.data.map((e: any) => m(e));
}
