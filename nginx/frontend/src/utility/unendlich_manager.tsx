import axios from "axios";
import { Todo } from "../todos";
import { ApiManager } from "./api_manager";

export class UnendlichManager extends ApiManager {
  async getTodos() {
    const response = await axios.get(
      "http://localhost:1337/api/unendlich/todos",
      {
        auth: { username: "root", password: "ath" },
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    return this.retrieveResults(response, Todo.fromResponse);
  }
}
