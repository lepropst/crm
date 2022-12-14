import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Menu } from "@headlessui/react";
import { useMemo } from "react";
import { useSlate } from "slate-react";
import React from "react";
import { CustomEditor } from "./handlers";
import { Icon } from "./Icon";

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: IconProp;
}) => {
  const editor = useSlate();
  let active = useMemo(
    () => CustomEditor.isMarkActive(editor, format),
    [format]
  );
  return (
    <Menu.Button
      className={active ? "bg-gray-500" : ""}
      onMouseDown={(event: any) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Menu.Button>
  );
};

export default MarkButton;
