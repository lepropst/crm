import React, { useEffect } from "react";
import { getTodoList } from "../utility/unendlich_manager";
import { TodoList } from "./model";

export function ListViewer(props: { lists: TodoList[] }) {
  let lists: TodoList[] = props.lists || [];

  return (
    <div>
      {lists.length}
      <div>
        <ul>
          {lists.length != 0 && lists.map((e: TodoList) => <li>{e.label}</li>)}
        </ul>
      </div>
    </div>
  );
}
export default ListViewer;
