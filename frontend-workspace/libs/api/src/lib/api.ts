import { Axios } from '@frontend-workspace/singletons';
import { NextApiResponse } from 'next';
export function api(): string {
  return 'api';
}

export async function api_add({
  body,
  user,
  res,
}: {
  body: any;
  user: { token: string; username: string; password: string; id: string };
  res: NextApiResponse<any>;
}) {
  let url = '';
  try {
    url = `${body.preped ? body.prepend : 'unendlich'}/${body.type}/`;
    const resp = await Axios.getInstance().axios.post(
      url,
      {
        ...body,
        owner: user.id,
      },
      { headers: { Authorization: `Token ${user.token}` } }
    );
    console.log('axios request sent');
    console.log(resp);
    res.send({ ok: true });
  } catch (e) {
    console.log('error makig notebook');
    console.log(e);
    res.status(400).json({ ok: false });
  }
}
