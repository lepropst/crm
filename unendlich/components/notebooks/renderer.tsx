import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, SyntheticEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Axios from "../../utilities/axios";
import { Note, NotePreview } from "../notes";
import NoteBook from "./model";
import { TwoColumnLayout } from "./TwoColumnLayout";

export function Renderer({ user }: { user: any }) {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url: string): Promise<NoteBook> => {
    const res = await Axios.getInstance().axios.get(url, {
      headers: {
        Authorization: `Token ${user.token}`,
        "Content-Type": "Application/json",
      },
    });

    if (res.status !== 200) {
      console.log("error occured");
      throw new Error(res.data);
    }
    console.log(res.data);
    return NoteBook.fromNoteBook(res.data);
  };
  const { data, mutate, error } = useSWR(`/unendlich/notebooks/${id}`, fetcher);
  const [countdown, setCountDown] = useState(2);
  const [formData, setFormData] = useState<any>({ label: "" });

  const triggerReload = async () => {};
  useEffect(() => {
    if (countdown === 0) {
      setCountDown(2);
      const fetchDatta = async () => api.saveNoteBook({ ...data, ...formData });
      fetchDatta().catch((e) => console.log(e));
    }
    setCountDown(countdown - 1);
  }, [data]);
  const api = {
    addNote: async (nb: Note) => {
      try {
        await axios.post("/api/add/", {
          ...nb,
          content:
            nb.content.length > 0
              ? nb.content.map((e) => JSON.stringify(e))
              : nb.content,
          type: "notes",
        });
        setFormData({ label: "" });
        mutate();
      } catch (e) {
        console.log(e);
      }
    },
    saveNoteBook: async (nb: NoteBook) => {
      try {
        const res = await axios.post("/api/save", { type: "notebooks", ...nb });
        await mutate();
      } catch (e) {
        console.log(e);
      }
    },
    deleteNote: async (id: number | undefined) => {
      if (id === undefined) {
        alert("unable to parse id");
        return;
      }
      try {
        const res = await axios.post("/api/delete/", {
          type: "notes",
          id,
        });

        await mutate();
      } catch (e) {
        console.log(e);
      }
    },
  };

  if (error) {
    return <>...error</>;
  }
  if (!data) {
    return <>loading...</>;
  }

  const handleChange = (
    e: SyntheticEvent & { target: { value: string; name: string } }
  ) => setFormData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="flex flex-col bg-primarylight">
      <div className="flex space-x-3 justify-between">
        <input
          name="label"
          className="flex-fill ml-4 mt-4"
          value={formData.label}
          onChange={handleChange}
        />
        <button
          className="py-0 px-2 rounded border border-primarydark bg-white"
          onClick={async (e) => {
            e.preventDefault();
            if (data.id) {
              let tmp = Note.emptyModel(data.id);
              tmp = { ...tmp, ...formData };
              api.addNote(tmp);
            }
          }}
        >
          add note
        </button>
      </div>

      {data.notes && data.notes.length > 0 && (
        <TwoColumnLayout
          triggerReload={triggerReload}
          deleteNote={api.deleteNote}
          data={data}
        />
      )}
    </div>
  );
}
