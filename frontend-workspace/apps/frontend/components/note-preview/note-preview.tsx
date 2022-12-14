import React from 'react';
import { Note } from '../../models';
type Props = {
  note: Note;
};
export function NotePreview(props: Props) {
  const { note } = props;
  return (
    <div>
      <p>{note.label}</p>
      <p>{note.notebook}</p>
      <p>{note.dateEdited}</p>
      <p>{}</p>
    </div>
  );
}
export default NotePreview;
