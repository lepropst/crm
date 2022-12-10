import { useSlate } from "slate-react";
import { Icon } from "./Icon";
import { toggleMark, isMarkActive } from "./globalfunctions";
import { TEXT_ALIGN_TYPES } from "./config";

type Props = { format: string; icon: string };
export const MarkButton = ({ format, icon }: Props) => {
  const editor = useSlate();
  const active = isMarkActive(
    editor,

    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  )
    ? "bg-primarydark"
    : "bg-primarylight";
  return (
    <button
      className={active}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} />
    </button>
  );
};
