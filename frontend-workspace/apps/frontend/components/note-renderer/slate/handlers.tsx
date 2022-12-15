import isHotkey from "is-hotkey";
import {
  BaseElement,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";

import {
  FORMATS,
  FormattedText,
  HOTKEYS,
  LIST_TYPES,
  TEXT_ALIGN_TYPES,
} from "./config";
export const handleKeyboardEvents = (
  e: any,
  editor: Editor,
  value?: number
) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, e as any)) {
      e.preventDefault();
      const mark = HOTKEYS[hotkey];
      if (mark === HOTKEYS["Tab"]) {
        console.log("adding tab");
        CustomEditor.addTab(editor, mark, value);
      } else {
        CustomEditor.toggleMark(editor, mark);
      }
    }
  }
};

export const CustomEditor = {
  toggleMark: (editor: Editor, format: typeof FORMATS[number], value?: any) => {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      console.log("removing mark", format);
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, value ? value : true);
    }
  },
  isMarkActive: (editor: Editor, format: typeof FORMATS[number]) => {
    const marks: null | (Omit<FormattedText, "text"> & { [key: string]: any }) =
      Editor.marks(editor);

    if (marks && marks[format] == true) {
      console.log(marks[format]);
      return true;
    }
    return marks ? marks[format] === true : false;
  },

  toggleBlock: (
    editor: Editor,
    format: typeof FORMATS[number],
    formatOptions: any & { size?: number }
  ) => {
    const isActive = CustomEditor.isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });

    let newProperties: any;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
        options: formatOptions,
      };
    } else {
      newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
        options: formatOptions,
      };
    }

    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block: any = {
        type: format,
        children: [],
      };
      Transforms.wrapNodes(editor, block);
    }
  },

  isBlockActive: (editor: Editor, format: typeof FORMATS[number]) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
      })
    );

    return !!match;
  },
  handleInsertList(
    editor: Editor,
    format: typeof LIST_TYPES[number],
    formatOptions: { nested: boolean }
  ) {
    const isActive = CustomEditor.isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    if (formatOptions.nested) {
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          LIST_TYPES.includes(n.type),
        split: true,
      });
      console.log("nested");

      let newProperties: any = {
        type: format,
        options: formatOptions,
      };

      Transforms.setNodes<SlateElement>(editor, newProperties);

      const block: any = {
        type: "list-item",
        children: [],
      };
      Transforms.wrapNodes(editor, block);
    } else {
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          LIST_TYPES.includes(n.type) &&
          !TEXT_ALIGN_TYPES.includes(format),
        split: true,
      });

      let newProperties: any;
      if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
          align: isActive ? undefined : format,
          options: formatOptions,
        };
      } else {
        newProperties = {
          type: isActive ? "paragraph" : isList ? "list-item" : format,
          options: formatOptions,
        };
      }

      Transforms.setNodes<SlateElement>(editor, newProperties);

      if (!isActive && isList) {
        const block: any = {
          type: format,
          children: [],
        };
        Transforms.wrapNodes(editor, block);
      }
    }
  },
  addTab: (
    editor: Editor,
    format: typeof FORMATS[number],
    indent: number | undefined
  ) => {
    const addTabInternal = () => {
      Editor.insertText(editor, "\u0009".toString());
    };
    addTabInternal();
  },
};
