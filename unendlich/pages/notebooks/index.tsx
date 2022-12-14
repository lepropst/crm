import axios from "axios";
import { resolveSoa } from "dns/promises";
import { NextPage } from "next";
import useSWR, { mutate } from "swr";
import NoteBookPreview from "../../components/notebooks/NotebookPreview";
import NoteBook from "../../components/notebooks/model";
import Axios from "../../utilities/axios";
import { withSessionSsr } from "../../utilities/withSession";
type Props = { user: any };
const Page: NextPage<Props> = ({ user }: Props) => {
  const api = {
    addNoteBook: async (nb: NoteBook) => {
      console.log(nb);
      const resp = await axios.post(`/api/add/`, {
        type: "notebooks",
        ...nb,
      });
      if (resp.status !== 200) {
        alert("Unable to add");
      }
      mutate("/unendlich/notebooks/");
    },
    saveNoteBook: async (nb: NoteBook) => {
      try {
        const resp = await axios.put("/api/save", {
          type: "notebooks",
          ...nb,
        });
        if (resp.status !== 200) {
          alert("Unable to save");
        }
        mutate("/unendlich/notebooks/");
      } catch (e) {
        console.log(e);
      }
    },
    deleteNoteBook: async (id: number) => {
      try {
        const resp = await axios.post("/api/delete", {
          type: "notebooks",
          id: id,
        });
        mutate("/unendlich/notebooks/");
      } catch (e) {
        console.log(e);
      }
    },
  };
  const fetcher = async (url: string) => {
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
    return res.data.map((e: NoteBook) => NoteBook.fromNoteBook(e));
  };
  const { data, error } = useSWR("/unendlich/notebooks/", fetcher);

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-primarylight">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 bg-white w-full p-3">
        {!data && <>...loading</>}
        {data &&
          data.map((e: NoteBook) => {
            return (
              <NoteBookPreview
                deleteNoteBook={api.deleteNoteBook}
                saveNoteBook={api.saveNoteBook}
                nb={e}
              />
            );
          })}
      </div>
      <div className="sticky right-2 bottom-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            api.addNoteBook(NoteBook.emptyModel(user));
            mutate("/unendlich/notes/");
          }}
          className="p-0 w-10 h-10 bg-primarydark rounded-full hover:bg-teal-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        >
          <svg
            viewBox="0 0 20 20"
            enable-background="new 0 0 20 20"
            className="w-6 h-6 inline-block"
          >
            <path
              fill="#FFFFFF"
              d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    return {
      props: {
        user: user,
      },
    };
  }
);

export default Page;
