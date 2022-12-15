import { withIronSessionApiRoute } from 'iron-session/next';

import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import Axios from '../../utilities/axios';

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    const user = req.session.user;
    let url = '';

    if (user) {
      try {
        url = `${req.body.prepend ? req.body.prepend : 'unendlich'}/${
          req.body.type
        }/${req.body.id}/`;
        console.log(req.body);
        const tmp = req.body.content
          ? req.body.content.map((e) => JSON.stringify(e))
          : [];
        const resp = await Axios.getInstance().axios.put(
          url,
          {
            ...req.body,
            content: tmp,
            owner: user.id,
          },
          { headers: { Authorization: `Token ${user.token}` } }
        );
        console.log('axios request sent');
        console.log(resp);
        res.send({ ok: true });
      } catch (e) {
        console.log(e);
        res.status(400).json({ ok: false });
      }
    }
  },
  {
    password:
      process.env.COOKIE_PASSWORD ||
      'complex_password_at_least_32_characters_long',
    cookieName: 'unendlich_cookie', // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
);
