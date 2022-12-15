import React from 'react';

import { NoteBookRenderer } from '../../components/note-book-renderer/note-book-renderer';
import Axios from '../../utilities/axios';
import { withSessionSsr } from '../../plugins/withSession';

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
