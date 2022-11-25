import React, { useState } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router";
import { Form, Link } from "react-router-dom";
import TodoItem from "./TodoItem";
import Todo from "./model";
export function Element() {
  let todos = useLoaderData() as Todo[];
  let navigation = useNavigation();
  let formRef = React.useRef<HTMLFormElement>(null);

  // If we add and then we delete - this will keep isAdding=true until the
  // fetcher completes it's revalidation
  let [isAdding, setIsAdding] = useState(false);
  const [ascending, setAscending] = useState(false);
  React.useEffect(() => {
    if (navigation.formData?.get("action") === "add") {
      setIsAdding(true);
    } else if (navigation.state === "idle") {
      setIsAdding(false);
      formRef.current?.reset();
    }
  }, [navigation]);

  const handleSort = () => {
    if (ascending) {
      console.log("sorting ascending");
      todos.sort((a: Todo, b: Todo) => {
        return a.dateDue > b.dateDue ? 1 : -1;
      });
      setAscending(!ascending);
    } else {
      console.log("sorting descending");
      todos.sort((a: Todo, b: Todo) => {
        return a.dateDue < b.dateDue ? 1 : -1;
      });
      setAscending(!ascending);
    }
  };

  return (
    <>
      <div className="container w-screen h-screen w-screen bg-gradient-to-t from-teal-50 via-blue-50 to-transparent">
        <h1 className="w-screen p-2 bg-gradient-to-r from-teal-500 to-transparent">
          Todos
        </h1>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-6 flex space-x-2 align-bottom">
            <span className="p-1">Number of Tasks: {todos.length}</span>
            <button
              className="bg-green-100 hover:bg-green-500 p-1 rounded"
              onClick={handleSort}
            >
              {ascending ? "Due last" : "Due First"}
            </button>
          </div>
          {todos.map((e) => (
            <TodoItem todo={e} />
          ))}
        </div>
      </div>

      <Outlet />
    </>
  );
}
export default Element;
