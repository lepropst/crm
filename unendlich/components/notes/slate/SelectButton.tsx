import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Menu } from "@headlessui/react";
import { ReactNode, useMemo } from "react";
import { useSlate } from "slate-react";
import { FORMATS, TEXT_ALIGN_TYPES } from "./config";
import { CustomEditor } from "./handlers";
import { Icon } from "./Icon";
import React from "react";
type Props = {
  format: typeof FORMATS[number];
  children: ReactNode;
  eventHandler?: (e: any) => void;
  formatoptions?: { size?: number };
};
export const SelectButton = ({
  format,
  children,
  eventHandler,
  formatoptions = {},
}: Props) => {
  const editor = useSlate();
  return (
    <>
      <Menu.Button
        className={`${
          CustomEditor.isBlockActive(editor, format)
            ? "border border-primarydark"
            : ""
        }`}
        onMouseDown={(e) => {
          e.preventDefault();
          const tmp: (HTMLElement & { [key: string]: any }) | null =
            document.getElementById("headingSizeSelect");
          if (tmp)
            CustomEditor.toggleBlock(editor, format, {
              size: tmp["selectedIndex"] + 1,
            });
        }}
      >
        {CustomEditor.isBlockActive(editor, format) ? "-" : "+"}
      </Menu.Button>
      <select id="headingSizeSelect">{children}</select>
    </>
  );
};
