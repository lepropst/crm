import React from 'react';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { mutate } from 'swr';
import NoteBook from '../../notebooks/model';
import NoteDisplay from '../../note-display/note-display';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export function TwoColumnLayout({
  data,

  deleteNote,
}: {
  data: any;

  deleteNote: (id: number | undefined) => Promise<void>;
}) {
  return (
    <div className="grid grid-cols-2  grid-rows-auto">
      {data.notes.map((e: NoteBook) => {
        if (!e.id) {
          return <>undefined id</>;
        }
        return (
          <div key={e.label} className="relative flex justify-between">
            <NoteDisplay e={e} deleteNote={deleteNote} />
          </div>
        );
      })}
    </div>
  );
}
