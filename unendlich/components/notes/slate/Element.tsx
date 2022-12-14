import React, { useState } from "react";
import { CustomElement } from "./config";

type Props = {
  attributes: any;
  children: any;
  element: CustomElement;
  options?: any;
};
export const Element = ({ attributes, children, element, options }: Props) => {
  const style = { textAlign: element.align };
  let size = "";

  if (element.options?.size) {
    const num = element.options.size;

    if (num === 1) {
      size = "text-3xl";
    }
    if (num === 2) {
      size = "text-2xl";
    }
    if (num === 3) {
      size = "text-lg";
    }
    if (num === 4) {
      size = "text-base";
    }
    if (num === 5) {
      size = "text-sm";
    }
    if (num === 6) {
      size = "text-sm";
    }
  }
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote className="prose mx-3.5" style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul className="list-disc prose m-6 " style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading":
      return (
        <h2
          className={`prose ${size}`}
          style={style}
          {...{ ...attributes, className: `prose ${size}` }}
        >
          {children}
        </h2>
      );

    case "list-item":
      return (
        <li style={style} {...attributes} {...options}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal prose m-6" style={style} {...attributes}>
          {children}
        </ol>
      );
    case "table":
      return (
        <table className="table table-auto">
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case "table-row":
      return (
        <tr className="table-row" {...attributes}>
          {children}
        </tr>
      );
    case "table-cell":
      return (
        <td className="table-cell" {...attributes}>
          {children}
        </td>
      );

    default:
      return (
        <p className="prose" style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
