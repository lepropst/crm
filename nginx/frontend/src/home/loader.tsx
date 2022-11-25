import axios from "axios";
import Task from "../todos/model";

interface HomeLoaderData {
  date: string;
}
export async function loader(): Promise<HomeLoaderData> {
  // fetch list of local todos
  let todos = null;
  try {
    const response = await axios.get(
      "http://localhost:1337/api/unendlich/todos",
      {
        auth: { username: "root", password: "ath" },
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    console.log("Response\n\n");
    console.log(response.data);
    todos = response.data.map((e) => Task.fromResponse(e));
  } catch (e) {
    console.log(e);
  }

  // fetch list of notes
  // fetch list of accounts
  // fetch tasks relevant by priority
  return {
    date: new Date().toISOString(),
  };
}
export default loader;
