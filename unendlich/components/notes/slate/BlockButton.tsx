import { useSlate } from "slate-react";
import { TEXT_ALIGN_TYPES } from "./config";
import { isBlockActive, toggleBlock } from "./globalfunctions";
import { Icon } from "./Icon";

export const BlockButton = ({
  format,
  icon,
}: {
  format: string;
  icon: string;
}) => {
  const editor = useSlate();
  const active = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  )
    ? "bg-primarydark"
    : "bg-primarylight";
  return (
    <button
      className={`${active}`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={icon} />
    </button>
  );
};

export default BlockButton;
