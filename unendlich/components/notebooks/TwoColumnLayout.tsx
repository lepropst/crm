import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment } from "react";
import { mutate } from "swr";
import NoteBook from "./model";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export function TwoColumnLayout({
  data,
  triggerReload,
  deleteNote,
}: {
  data: any;
  triggerReload: () => void;
  deleteNote: (id: number | undefined) => Promise<void>;
}) {
  return (
    <div className="grid grid-cols-2  grid-rows-auto">
      {data.notes.map((e: NoteBook) => {
        if (!e.id) {
          return <>undefined id</>;
        }
        return (
          <div className="relative flex justify-between">
            <Link href={`/notes/${e.id}`}>
              {e.label} {e.id}
            </Link>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                  <EllipsisHorizontalIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <form
                      method="POST"
                      onSubmit={(ev) => {
                        ev.preventDefault();
                        deleteNote(e.id);

                        triggerReload();
                      }}
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        );
      })}
    </div>
  );
}
