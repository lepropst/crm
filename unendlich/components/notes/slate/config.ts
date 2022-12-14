export const HOTKEYS: { [key: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
  Tab: "indent",
};

export const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": { value: "heading", options: { size: 1 } },
  "##": { value: "heading", options: { size: 2 } },
  "###": { value: "heading", options: { size: 3 } },
  "####": { value: "heading", options: { size: 4 } },
  "#####": { value: "heading", options: { size: 5 } },
  "######": { value: "heading", options: { size: 6 } },
};

export const FORMATS = [
  "bold",
  "italic",
  "underline",
  "code",
  "heading-one",
  "heading-two",
  "heading-three",
  "heading-four",
  "heading-five",
  "heading-six",
  "block-quote",
  "numbered-list",
  "bulleted-list",
  "left",
  "center",
  "right",
  "justify",
  "table",
  "table-cell",
  "table-row",
];

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
type BaseElement = {
  align: "left" | "center" | "right" | "justify";
  type: string;
  options?: { size?: number };
};
export type ParagraphElement = BaseElement & {
  type: "paragraph";
  children: CustomText[];
};

export type HeadingElement = BaseElement & {
  type: "heading";
  level: number;
  children: CustomText[];
};
export type BlockQuoteElement = BaseElement & {
  type: "block-quote";
  [key: string]: any;
};
export type BulletedListElement = BaseElement & {
  type: "bulleted-list";
  [key: string]: any;
};
export type ListItemElement = BaseElement & {
  type: "list-item";
  [key: string]: any;
};
export type NumberedListElement = BaseElement & {
  type: "numbered-list";
  [key: string]: any;
};
export type TableCellElement = BaseElement & {
  type: "table-cell";
};

export type TableRowElement = BaseElement & {
  type: "table-row";
};
export type FormattedText = { text: string; bold?: true };

export type CustomText = FormattedText;

export type TableElement = BaseElement & {
  type: "table";
};
export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockQuoteElement
  | BulletedListElement
  | ListItemElement
  | NumberedListElement
  | TableCellElement
  | TableRowElement
  | TableElement;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
