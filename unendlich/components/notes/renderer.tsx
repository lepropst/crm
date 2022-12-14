import { Note } from "./model";
import { NoteEditor } from "./slate/NoteEditor";
import React from "react";
export type Props = {
  note: Note;

  mutate: () => void;
};
export function Renderer(props: Props) {
  return <NoteEditor note={props.note} />;
}
