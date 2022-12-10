import Link from "next/link";
import { useState } from "react";
import { mutate } from "swr";
import { Note, NotePreview } from "../notes";
import NoteBook from "./model";
type NoteBookPreviewProps = {
  nb: NoteBook;
  saveNoteBook: (nb: NoteBook) => Promise<void>;
  deleteNoteBook: (id: number) => Promise<void>;
};
export function NoteBookPreview({
  nb,
  saveNoteBook,
  deleteNoteBook,
}: NoteBookPreviewProps) {
  const [reload, setReload] = useState(false);
  const triggerReload = () => setReload(!reload);
  const [data, setData] = useState<NoteBook>(nb);
  const handleSubmit = async (e: any) => {
    console.log(e);
    e.preventDefault();
    await saveNoteBook({ ...data });
    triggerReload();
  };
  const ListedNotes = () => {
    return (
      <>
        {data.notes?.map((e, i) => (
          <li key={`${e.label}-${i}`}>{e.label}</li>
        ))}
      </>
    );
  };
  return (
    <div className="border border-primarydark w-auto h-auto">
      <form
        onSubmit={handleSubmit}
        onKeyUp={(e) => {
          e.preventDefault();
          console.log(e);
        }}
        className="bg-primarylight"
      >
        <div className="flex">
          <input
            type="text"
            className="rounded m-2"
            value={data.label}
            name="label"
            onChange={(e) => {
              e.preventDefault();
              setData({
                ...data,
                dateEdited: new Date().toDateString(),
                label: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex items-center">
          <a
            onClick={async (e) => {
              e.preventDefault();
              if (data.id) {
                await deleteNoteBook(data.id);
                triggerReload();
                return;
              }
              alert("No id found");
            }}
            className="py-0.5 px-3 m-2 rounded border border-black"
          >
            delete
          </a>
          <Link href={`/notes/${data.id}`}>Open</Link>
        </div>
        <p>{data.dateEdited}</p>
      </form>
      {data.notes && (
        <>
          <p>{data.notes.length}</p>
          {data.notes.length > 0 && (
            <>
              <NotePreview note={data.notes[0]} />
              <ul>
                <li className="w-full bg-primarylight">Listed</li>
                {<ListedNotes />}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default NoteBookPreview;
