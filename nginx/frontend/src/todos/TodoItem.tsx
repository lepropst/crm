import React from "react";
import { Link, useFetcher } from "react-router-dom";
import Todo from "./model";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  let fetcher = useFetcher();

  let isDeleting = fetcher.formData != null;
  console.log(todo);
  return (
    <div className="flex flex-col">
      <div>{todo.label}</div>
      <div>{todo.id}</div>
      <div>{todo.description}</div>
      <div>{todo.dateDue}</div>
      <fetcher.Form method="post" style={{ display: "inline" }}>
        <input type="hidden" name="action" value="delete" />
        <button
          type="submit"
          name="todoId"
          value={todo.id}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
    </div>
    // <>
    //   <Link to={`/todos/${id}`}>{todo}</Link>
    //   &nbsp;
    //   <fetcher.Form method="post" style={{ display: "inline" }}>
    //     <input type="hidden" name="action" value="delete" />
    //     <button type="submit" name="todoId" value={id} disabled={isDeleting}>
    //       {isDeleting ? "Deleting..." : "Delete"}
    //     </button>
    //   </fetcher.Form>
    // </>
  );
}
export default TodoItem;
