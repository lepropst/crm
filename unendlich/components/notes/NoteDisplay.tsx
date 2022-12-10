import { ButtonHTMLAttributes, useState } from "react";
import { NoteBook } from "../notebooks";
type Props = {
  notes: NoteBook[];
};
export function NoteDisplay({ notes }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 grid-rows-auto">
      {notes.map((e: NoteBook) => {
        const [open, setOpen] = useState(false);

        return (
          <div className="relative flex justify-between">
            <p>
              {e.label} {e.id}
            </p>
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              className="text-white bg-primarynormal focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 text-center inline-flex items-center "
              type="button"
              onClick={(e) => setOpen(!open)}
            >
              ...
            </button>

            <div
              id="dropdown"
              className={`${
                open ? "visible" : "hidden"
              } absolute top-0 right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow`}
            >
              <ul
                className=" py-1 text-sm text-gray-700 "
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
