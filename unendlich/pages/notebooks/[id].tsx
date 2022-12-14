import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { NoteBook } from "../../components/notebooks/model";
import { Renderer as NoteBookRenderer } from "../../components/notebooks/renderer";
import Axios from "../../utilities/axios";
import { withSessionSsr } from "../../utilities/withSession";

type Props = { user: any };
export default function Page({ user }: Props) {
  return (
    <div>
      <NoteBookRenderer user={user} />
    </div>
  );
}

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
