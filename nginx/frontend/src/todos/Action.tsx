import { ActionFunctionArgs } from "react-router";
import { addTodo, deleteTodo, getTodos } from "../components/todos";

export async function Action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  // Deletion via fetcher
  if (formData.get("action") === "delete") {
    let id = formData.get("todoId");
    if (typeof id === "string") {
      console.log(id);
      // deleteTodo(id);
      return { ok: true };
    }
  }

  // Addition via <Form>
  let todo = formData.get("todo");
  if (typeof todo === "string") {
    addTodo(todo);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/todos" },
  });
}

export default Action;
