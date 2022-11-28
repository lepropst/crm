import axios from "axios";
import { TodoList } from "../todo_list";
import { getTodo } from "../utility/unendlich_manager";
import Todo from "./model";
export async function loader({ params }): Promise<Todo | null> {
  try {
    const data = await getTodo(params.todoId);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
