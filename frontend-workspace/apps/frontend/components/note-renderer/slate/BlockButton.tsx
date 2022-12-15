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
  icon: IconProp;
  children?: ReactNode;
  eventHandler?: (e: any) => void;
  formatOptions?: { size?: number };
};
export const BlockButton = ({
  format,
  icon,
  children,
  eventHandler,
  formatOptions = {},
}: Props) => {
  const editor = useSlate();

  return (
    <Menu.Button
      onMouseDown={(event: any) => {
        event.preventDefault();
        eventHandler
          ? eventHandler(event)
          : CustomEditor.toggleBlock(editor, format, formatOptions);
      }}
      className={`${
        CustomEditor.isBlockActive(editor, format)
          ? "border border-primarydark"
          : ""
      }`}
    >
      {children ? children : <Icon icon={icon} />}
    </Menu.Button>
  );
};
