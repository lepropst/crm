import { CustomElement } from "./config";
import React from "react";
type Props = {
  attributes: any;
  children: any;
  leaf: any;
};
export const Leaf = ({ attributes, children, leaf }: Props) => {
  if (leaf.indent) {
    console.log("indent icomig");
    children = <span {...attributes}>{children}</span>;
  }
  if (leaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }

  if (leaf.code) {
    children = <code {...attributes}>{children}</code>;
  }

  if (leaf.italic) {
    children = <em {...attributes}>{children}</em>;
  }

  if (leaf.underline) {
    children = <u {...attributes}>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
