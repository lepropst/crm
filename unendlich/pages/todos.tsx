import axios from "axios";
import { NextPageContext, NextPage } from "next";
import { base_url, base_config } from "../utilities";
import { ListViewer } from "../components/lists/ListViewer";
import { TodoList } from "../components/lists";
interface Props {
  lists?: any[];
}

const Page: NextPage<Props> = ({ lists }: Props) => {
  if (!lists) {
    return <div>Lists not fetched yet</div>;
  }
  return (
    <div>
      <h1>Todo Lists</h1>
      <div>
        {lists.map((e: TodoList, i: number) => (
          <ListViewer key={`${e.label}-${i}`} list={e} />
        ))}
      </div>
    </div>
  );
};
Page.getInitialProps = async (ctx: NextPageContext) => {
  const tmp = await axios.get(base_url + "/unendlich/lists", base_config);
  const lists = tmp.data;
  return { lists };
};

export default Page;
