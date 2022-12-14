import { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Node as SlateNode } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { Note } from "../model";
import { Toolbar } from "./Toolbar";
import MarkButton from "./MarkButton";
import { BlockButton } from "./BlockButton";
import { handleKeyboardEvents } from "./handlers";

import {
  faBold,
  faItalic,
  faUnderline,
  faCode,
  faQuoteLeft,
  faListOl,
  faListUl,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faTable,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import axios from "axios";
import { SelectButton } from "./SelectButton";
import { HOTKEYS, SHORTCUTS } from "./config";
import { withShortcuts } from "../plugins/withShortcuts";
import isHotkey from "is-hotkey";

export function NoteEditor({ note }: { note: Note }) {
  const renderElement = useCallback((props: any) => {
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    []
  );
  const [value, setValue] = useState<Descendant[]>(note.content);
  const [save, setSave] = useState(10);
  const [indentValue, setIndentValue] = useState(0);
  const [prevSelection, setPrevSelection] = useState<any>();
  const handleDOMBeforeInput = useCallback((e: InputEvent) => {
    queueMicrotask(() => {
      const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

      const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
        if (!diff.text.endsWith(" ")) {
          return false;
        }

        const { text } = SlateNode.leaf(editor, path);
        const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
        if (!(beforeText in SHORTCUTS)) {
          return;
        }

        const blockEntry = Editor.above(editor, {
          at: path,
          match: (n) => Editor.isBlock(editor, n),
        });
        if (!blockEntry) {
          return false;
        }

        const [, blockPath] = blockEntry;
        return Editor.isStart(editor, Editor.start(editor, path), blockPath);
      });

      if (scheduleFlush) {
        ReactEditor.androidScheduleFlush(editor);
      }
    });
  }, []);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );

        if (isAstChange) {
          // Save the value to Local Storage.
          // const content = JS//ON.stringify(value);
          // localStorage.setItem("content", content);

          setValue(value);
          if (save === 0) {
            setSave(10);
            try {
              axios.post("/api/save/", {
                type: "notes",
                ...note,
                content: value,
              });
            } catch (e) {
              console.log(e.response);
            }
          } else {
            setSave(save - 1);
          }
        }
      }}
    >
      <Toolbar>
        <MarkButton format="bold" icon={faBold} />
        <MarkButton format="italic" icon={faItalic} />
        <MarkButton format="underline" icon={faUnderline} />
        <MarkButton format="code" icon={faCode} />
        {/* TODO change to select for all 6 heading sizes */}
        <SelectButton format="heading">
          <option data-format="heading" data-formatoptions={{ size: 1 }}>
            1
          </option>
          <option data-format="heading" data-formatoptions={{ size: 2 }}>
            2
          </option>
          <option data-format="heading" data-formatoptions={{ size: 3 }}>
            3
          </option>
          <option data-format="heading" data-formatoptions={{ size: 4 }}>
            4
          </option>
          <option data-format="heading" data-formatoptions={{ size: 5 }}>
            5
          </option>
          <option data-format="heading" data-formatoptions={{ size: 6 }}>
            6
          </option>
        </SelectButton>

        <BlockButton format="block-quote" icon={faQuoteLeft} />
        <BlockButton format="numbered-list" icon={faListOl} />
        <BlockButton format="bulleted-list" icon={faListUl} />
        <BlockButton format="left" icon={faAlignLeft} />
        <BlockButton format="center" icon={faAlignCenter} />
        <BlockButton format="right" icon={faAlignRight} />
        <BlockButton format="justify" icon={faAlignJustify} />
        <BlockButton format="table" icon={faTable} />
        <BlockButton format="table-row" icon={faTableCells} />
      </Toolbar>
      <Editable
        className="border border-teal-500 prose-slate w-12/12"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onDOMBeforeInput={handleDOMBeforeInput}
        onKeyDown={async (e) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, e as any)) {
              e.preventDefault();
              const mark = HOTKEYS[hotkey];
              if (mark === HOTKEYS["Tab"]) {
                const nativeSelection = editor.selection;
                if (!prevSelection) {
                  setPrevSelection(nativeSelection);
                  return;
                }
                if (prevSelection !== nativeSelection) {
                  setIndentValue(0);
                } else setIndentValue(indentValue + 1);
                setPrevSelection(nativeSelection);
                handleKeyboardEvents(e, editor, indentValue);
              } else {
                handleKeyboardEvents(e, editor);
              }
            }
          }
        }}
      />
    </Slate>
  );
}
