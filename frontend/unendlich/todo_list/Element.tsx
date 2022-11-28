import React, { useState } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router";
import { Form, Link } from "react-router-dom";
import ListViewer from "./ListViewer";
import { TodoList } from "../todo_list";
import TodoElement from "./TodoElement";
import DoesNotExist from "../utility/DoesNotExist";
export function Element() {
  let lists = (useLoaderData() as TodoList[]) || null;

  if (lists === null) {
    return <DoesNotExist type="List" id={"all"} />;
  }
  return (
    <>
      <div className="container w-screen h-screen w-screen bg-gradient-to-t from-teal-50 via-blue-50 to-transparent">
        <h1 className="w-screen p-2 bg-gradient-to-r from-teal-500 to-transparent">
          Todo Lists
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {lists.map((list: TodoList, i: number) => {
            return (
              <div key={`${list.id}-${i}`}>
                <h2>{list.label}</h2>
                <p>{list.id}</p>
                <ul>
                  {list.todos.map((e) => (
                    <TodoElement todo={e} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <ListViewer lists={lists} />
      </div>

      <Outlet />
    </>
  );
}
export default Element;
