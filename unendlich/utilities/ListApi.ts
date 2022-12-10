import Axios from "./axios";

export default class ListApi {
  add(list_name: string) {
    Axios.getInstance().axios.post("/unendlich/lists/", { label: list_name });
  }
}
