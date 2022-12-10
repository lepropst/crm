import { useState } from "react";
import { Todo } from "../todos";
import { TodoList } from "./model";
import { Renderer as TodoRenderer } from "../todos/renderer";

export function Renderer(props: {
  list: TodoList;
  api: {
    deleteList: (id: number) => Promise<void>;
    addTodo: (todo: Todo) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
    saveTodo: (todo: Todo) => Promise<void>;
  };
}) {
  const { list, api } = props;
  const [data, setData] = useState({
    label: "",
    dateDue: "",
    description: "",
  });

  return (
    <div className="m-3 border border-primarydark lg:w-3/12 md:w-6/12 flex flex-col rounded shadow items-center justify-start bg-white font-sans">
      <div className="flex space-x-2">
        <h1 className="text-slate-800 text-2xl font-semibold underline">
          {list.label} : {list.id}
        </h1>
        <button
          onClick={(e) => props.api.deleteList(list.id!)}
          className="border border-primarydark rounded p-2"
        >
          Delete
        </button>
      </div>

      <form
        id="todo-add-form"
        className="flex flex-col space-y-2 m-3"
        onSubmit={(e: any) => {
          e.preventDefault();
          const datum = {
            label: data.label,
            dateDue: data.dateDue || new Date(),
            description: data.description,
            list: list.id,
          };
          api.addTodo(datum as Todo);
        }}
      >
        <input
          name="label"
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="label"
          onChange={(e) => setData({ ...data, label: e.target.value })}
          value={data.label}
        />
        <div className="flex justify-items-stretch">
          <input
            name="dateDue"
            type="date"
            className="shadow appearance-none border rounded p-2 text-grey-darker"
            placeholder="Date Due"
            onChange={(e) => setData({ ...data, dateDue: e.target.value })}
            value={data.dateDue}
          />
        </div>
        <textarea
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Description"
        />
        <button
          type="submit"
          className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
        >
          Add
        </button>
      </form>

      <div className="bg-primarydark flex justify-center w-full h-8">
        <h2 className="text-lg font-semibold underline text-white">Todos</h2>
      </div>

      <ul className="flex flex-col h-36 space-y-3 overflow-scroll">
        {list.todos.map((e: Todo, i) => {
          return (
            <TodoRenderer
              key={`${e.label}-${i}`}
              deleteTodo={api.deleteTodo}
              todo={e}
              saveTodo={api.saveTodo}
            />
          );
        })}
      </ul>
    </div>
  );
}
