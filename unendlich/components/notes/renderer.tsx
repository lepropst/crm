import { Note } from "./model";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor, Element as SlateElement } from "slate";
import { withHistory } from "slate-history";

import { useCallback, useMemo, useState } from "react";
import { hotkeyEventHandler } from "./slate/eventHandlers";
import { Toolbar } from "./slate/Toolbar";
import { MarkButton } from "./slate/MarkButton";
import BlockButton from "./slate/BlockButton";
import Element from "./slate/Element";
import Leaf from "./slate/Leaf";
// import { Button, Icon, Toolbar } from '../components'

export type Props = {
  note: Note;
};
export function Renderer(props: Props) {
  console.log(props.note);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const initialValue = props.note;

  console.log(initialValue);
  return (
    <Slate editor={editor} value={initialValue.content}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(e) => {
          e.preventDefault();
          hotkeyEventHandler(e, editor);
        }}
      />
    </Slate>
  );
}
