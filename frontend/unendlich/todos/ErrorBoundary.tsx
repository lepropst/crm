import React from "react";
import { useRouteError } from "react-router";

export function ErrorBoundary() {
  let error = useRouteError() as Error;
  return (
    <>
      <h2>Error 💥</h2>
      <p>{error.message}</p>
    </>
  );
}
export default ErrorBoundary;
