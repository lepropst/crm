import React, { useState } from "react";
import { Outlet, useLoaderData, useNavigation, useParams } from "react-router";
import { Form, Link } from "react-router-dom";
import TodoItem from "./TodoItem";
import Todo from "./model";
import ListViewer from "../todo_list/ListViewer";
import DoesNotExist from "../utility/DoesNotExist";
export function Element() {
  let todo = (useLoaderData() as Todo) || null;
  const p = useParams();
  if (todo === null) {
    console.log(p);
    return <DoesNotExist type="Todo" id={`${p.todoId}`} />;
  }

  let navigation = useNavigation();
  let formRef = React.useRef<HTMLFormElement>(null);

  // If we add and then we delete - this will keep isAdding=true until the
  // fetcher completes it's revalidation
  // let [isAdding, setIsAdding] = useState(false);
  // const [ascending, setAscending] = useState(false);
  // React.useEffect(() => {
  //   if (navigation.formData?.get("action") === "add") {
  //     setIsAdding(true);
  //   } else if (navigation.state === "idle") {
  //     setIsAdding(false);
  //     formRef.current?.reset();
  //   }
  // }, [navigation]);

  console.log(p);

  return (
    <>
      <div className="container w-screen h-screen w-screen bg-gradient-to-t from-teal-50 via-blue-50 to-transparent">
        <h1 className="w-screen p-2 bg-gradient-to-r from-teal-500 to-transparent">
          Todo {p.todoId}
        </h1>
        <h2>{todo.label}</h2>
        <p>{todo.dateDue}</p>
        <p>{todo.description}</p>
      </div>

      <Outlet />
    </>
  );
}
export default Element;
