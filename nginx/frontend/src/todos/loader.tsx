import axios from "axios";
import { UnendlichManager } from "../utility/unendlich_manager";
import Todo from "./model";
export async function loader(): Promise<Todo[]> {
  const manager = new UnendlichManager();
  try {
    return await manager.getTodos();
  } catch (e) {
    console.log(e);
    return [];
  }
}
