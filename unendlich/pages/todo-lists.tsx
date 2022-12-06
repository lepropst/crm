import axios from "axios";

import { NextPageContext, NextPage } from "next";
import { base_url, base_config } from "../utilities";
import { ListViewer } from "../components/lists/ListViewer";
import { TodoList } from "../components/lists";
import useSWR from "swr";
import { Todo } from "../components/todos";
import Axios from "../utilities/axios";

interface Props {
  lists: any[];
}
const Page: NextPage<Props> = ({ lists }: Props) => {
  const { data, error } = useSWR(
    "/unendlich/lists/",
    Axios.getInstance().fetcher
  );
  const api = {
    add: (todo: any) => {
      console.log(typeof todo);
      console.log(process.env);
      const data = {
        label: todo.label.value,
        dateDue:
          todo.dateDue.value || new Date("{{ selected_date.isoformat }}"),
        description: todo.description.value || "",
        list: todo.list.value,
      };
      axios
        .post(
          base_url + "/unendlich/todos/",
          {
            data: data,
          },
          {
            auth: {
              username: "root",
              password: "ath",
            },
            headers: {
              "Content-Type": "application/json",
              // "X-CSRFToken": csrfToken,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => console.log(e));
    },
    edit: (list: TodoList) => {
      console.log("editing list");
      console.log(list);
      return list;
    },
    delete: (id: number) => {
      console.log("deleting: ", id);
    },
  };
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className="flex flex-row spacing-x-3 bg-backgroundprimary h-screen w-screen">
      {data.length > 0 &&
        data.map((e: TodoList, i: number) => (
          <ListViewer api={api} key={`${e.label}-${i}`} list={e} />
        ))}
    </div>
  );
};

export default Page;
