import { AxiosResponse } from "axios";
import Model from "./Model";

const base_url = "http://localhost:8000/api/";
export class ApiManager {
  retrieveResults(
    response: AxiosResponse,
    m: (m: Map<String, String>) => Model
  ) {
    return response.data.map((e) => m(e));
  }
  buildUrl(parts: string[]) {
    return (
      base_url +
      parts.reduce((accumulator, currentValue) => accumulator + currentValue)
    );
  }
}
