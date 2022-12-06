import { SyntheticEvent, useState } from "react";
import { Todo } from "../todos";
import { TodoList } from "./model";

export function ListViewer(props: {
  list: TodoList;
  api: {
    add: (todo: any) => void;
    delete: (id: number) => void;
    edit: (list: TodoList) => TodoList;
  };
}) {
  const { list, api } = props;
  const [selectedList, setSelectedList] = useState(list.id);
  const [isSaved, setIsSaved] = useState(false);
  const handleFormChange = (formData: any) => {
    console.log("Handling form change");
    console.log(formData);
    setIsSaved(true);
  };
  return (
    <div className="m-3 border border-primarydark lg:w-3/12 md:w-6/12 flex flex-col rounded shadow items-center justify-start bg-white font-sans">
      <h1 className="text-slate-800 text-2xl font-semibold underline">
        {list.label} : {list.id}
      </h1>

      <form
        id="todo-add-form"
        className="flex flex-col space-y-2 m-3"
        onSubmit={(e: SyntheticEvent) => {
          e.preventDefault();
          api.add(e.target);
        }}
      >
        <input
          name="label"
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Todo"
        />
        <div className="flex justify-items-stretch">
          <input
            name="dateDue"
            type="date"
            className="shadow appearance-none border rounded p-2 text-grey-darker"
            placeholder="Add Todo"
          />

          <input
            name="list"
            type="text"
            className="shadow appearance-none border rounded p-2 text-grey-darker"
            value={selectedList}
            onChange={(e) => {
              e.preventDefault();
              //   setSelectedList(e.target.value);
            }}
          />
        </div>
        <textarea
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Todo"
        />
        <button
          type="submit"
          className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
        >
          Add
        </button>
      </form>

      <div className="bg-primarylight flex justify-center w-full h-8">
        <h2 className="text-slate-800 text-lg font-semibold underline">
          Todos
        </h2>
      </div>

      <ul className="flex flex-col space-y-3 overflow-scroll">
        {list.todos.map((e: Todo) => {
          return (
            <li className="flex flex-col items-start">
              <form
                id="list-form"
                className="flex"
                action="/list-handler"
                method="POST"
                onChange={handleFormChange}
              >
                <div className="flex flex-col w-8/12">
                  <input onChange={() => setIsSaved(false)} value={e.label} />
                  <input
                    onChange={() => setIsSaved(false)}
                    type="textfield"
                    className="w-full text-grey-darkest"
                    value={e.description || "No Description"}
                  />
                  <input
                    onChange={() => setIsSaved(false)}
                    type="textfield"
                    className="w-full text-grey-darkest"
                    value={e.dateDue || "No Description"}
                  />
                </div>
                <div className="flex flex-col">
                  <button type="submit" onClick={handleFormChange}>
                    {isSaved ? "saved" : "edited"}
                  </button>
                  <select
                    onChange={() => setIsSaved(false)}
                    form="list-form"
                    className="bg-green flex-no-shrink border-2 rounded hover:text-blue text-green-600 border-green-500 hover:text-white hover:bg-green-500 w-12/12"
                  >
                    <option>Finished</option>
                    <option>Unfinished</option>
                    <option>Due Soon</option>
                  </select>
                </div>
              </form>

              <div className="w-6/12 flex self-end justify-center">
                <form
                  action="/list-handler-delete"
                  method="DELETE"
                  onSubmit={() => {
                    api.delete(e.id);
                  }}
                >
                  <button
                    type="submit"
                    className="flex-no-shrink border-2 rounded text-red-600 border-red-500 hover:text-white hover:bg-red-500"
                  >
                    Delete
                    {e.id}
                  </button>
                </form>
              </div>

              <span className="h-1 w-11/12 bg-primarydark lg:w-1/3 self-center"></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
