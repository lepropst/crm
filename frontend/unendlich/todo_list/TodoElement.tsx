import React from "react";
import { Todo } from "../todos";

export function TodoElement({ todo }: { todo: Todo }) {
  return (
    <div>
      <p>{todo.label}</p>
      <p>{todo.dateDue}</p>
    </div>
  );
}
export default TodoElement;
