import { HOTKEYS } from "./config";
import { Editor, Transforms } from "slate";
import { KeyboardEventHandler } from "react";
import isHotkey from "is-hotkey";
const toggleMark = (editor: Editor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const hotkeyEventHandler = (event: any, editor: Editor) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey];
      toggleMark(editor, mark);
    }
  }
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks: Omit<any, "text"> | null = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
