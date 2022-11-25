import React from "react";
import { Outlet, useLoaderData, useParams } from "react-router";

export function Todo() {
  let params = useParams();
  let todo = useLoaderData() as string;
  return (
    <>
      <h2>Nested Todo Route:</h2>
      <p>id: {params.id}</p>
      <p>todo: {todo}</p>
      <Outlet />
    </>
  );
}
