import React from "react";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import StandardErrorBoundary from "./utility/StandardErrorBoundary";
import StandardFallback from "./utility/StandardFallback";
import {
  loader as todosLoader,
  ErrorBoundary as TodoErrorBoundary,
  Action as todosAction,
  Element as TodoElement,
} from "./todos";
import {
  HomeElement,
  Element as IndexElement,
  loader as homeLoader,
} from "./home";
import { Element as TodoListElement } from "./todo_list";

import "./styles.css";

// EXAMPLE
// --------------------
// path: "todos",
// action: todosAction,
// loader: todosLoader,
// element: <TodosList />,
// errorElement: <TodosBoundary />,
let router = createBrowserRouter([
  {
    path: "/",
    loader: homeLoader,
    action: () => console.log("Home page action"),
    element: <IndexElement />,
    errorElement: <StandardErrorBoundary />,
    children: [
      {
        path: "/home",
        element: <HomeElement />,
        errorElement: <StandardErrorBoundary />,
      },
      {
        path: "/todos",
        // action: todosAction,
        element: <TodoListElement />,
        errorElement: <TodoErrorBoundary />,
      },

      {
        path: "/:todoId",
        // action: todsosAction,
        loader: todosLoader,
        element: <TodoElement />,
        errorElement: <TodoErrorBoundary />,
      },
    ],
  },
]);

export function App() {
  return (
    <RouterProvider router={router} fallbackElement={<StandardFallback />} />
  );
}
export default App;
