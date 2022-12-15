import React, { useState } from 'react';

import { Todo } from './model';
export interface TodoRendererProps {
  todo: Todo;
  saveTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}
/* eslint-disable-next-line */

export function TodoRenderer(props: TodoRendererProps) {
  const [isSaved, setIsSaved] = useState(true);
  const [data, setData] = useState<Todo>(props.todo);
  return (
    <li className="flex flex-col items-start">
      <form
        id="list-form"
        className="flex"
        action="/list-handler"
        method="POST"
        onChange={(e) => {
          setIsSaved(false);
          console.log(e.target);
        }}
        onSubmit={(e) => {
          e.preventDefault();
          props.saveTodo(data);
        }}
      >
        <div className="flex flex-col w-8/12">
          <input
            value={data.label}
            className="bg-backgroundprimary"
            onChange={(e) => {
              e.preventDefault();
              setIsSaved(false);
              setData({ ...data, label: e.target.value });
            }}
          />

          <input
            type="textfield"
            className="w-full text-grey-darkest"
            value={data.description || 'No Description'}
            onChange={(e) => {
              e.preventDefault();
              setIsSaved(false);
              setData({ ...data, description: e.target.value });
            }}
          />
          <input
            type="textfield"
            className="w-full text-grey-darkest"
            value={data.dateDue || 'No Description'}
            onChange={(e) => {
              e.preventDefault();
              setIsSaved(false);
              setData({ ...data, dateDue: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col w-4/12">
          <button className="border border-primarydark rounded" type="submit">
            {isSaved ? 'saved' : 'edited'}
          </button>

          <button
            className="flex-no-shrink border-2 rounded text-red-600 border-red-500 hover:text-white hover:bg-red-500"
            onClick={async (ev) => {
              ev.preventDefault();
              await props.deleteTodo(props.todo.id);
            }}
          >
            Delete
          </button>
        </div>
      </form>

      <span className="h-1 w-11/12 bg-primarydark lg:w-1/3 self-center"></span>
    </li>
  );
}

export default TodoRenderer;
