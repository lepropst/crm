import axios from "axios";
import { TodoList } from "./model";
import { getTodoLists } from "../utility/unendlich_manager";

export async function loader(): Promise<TodoList[] | null> {
  try {
    const data = await getTodoLists();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
