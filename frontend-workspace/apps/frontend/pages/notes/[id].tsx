import { Renderer as NoteRenderer } from '../../components/notes/renderer';
import useSWR from 'swr';
import { Note } from '../../components/notes/model';
import Axios from '../../utilities/axios';
import React from 'react';

import { withSessionSsr } from '../../plugins/withSession';

type Props = { user: any; id: number };
export default function Page({ user, id }: Props) {
  const fetcher = async (url: string): Promise<Note> => {
    const res = await Axios.getInstance().axios.get(url, {
      headers: {
        Authorization: `Token ${user.token}`,
        'Content-Type': 'Application/json',
      },
    });

    if (res.status !== 200) {
      console.log('error occured');
      throw new Error(res.data);
    }
    console.log(res.data);
    return Note.fromNote(res.data);
  };

  const { data, mutate, error } = useSWR(`/unendlich/notes/${id}`, fetcher);
  if (!data || error) {
    return <>...loading</>;
  }
  return <NoteRenderer note={data} mutate={mutate} />;
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const id = query.id;
    const user = req.session.user;
    return {
      props: {
        user: user,
        id: id,
      },
    };
  }
);
