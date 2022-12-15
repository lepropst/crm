import { withIronSessionApiRoute } from 'iron-session/next';

import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import Axios from '../../utilities/axios';

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    let error = false;
    const tmp = '';
    try {
      const tmp1 = await Axios.getInstance().axios.post(
        'http://localhost:1337/crm/auth/login/',
        { password: password, username: username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: { password: password, username: username },
        }
      );
      const toke = tmp1.data;

      const id = await Axios.getInstance().axios.get('/auth/profile/', {
        headers: { authorization: `Token ${toke.token}` },
      });

      console.log(id);
      if (id.status !== 200) {
        res.status(400).json({ error: true });
      }
      const user = {
        username: tmp1.data.user.username,
        password: req.body.password,
        token: `${toke.token}`,
        id: id.data.id,
      };
      req.session.user = user;
      await req.session.save();

      res.status(200).json({ ok: true });
    } catch (e) {
      console.log('error logging in');
      console.log(e);
      error = true;
      res.status(400).json(new Error('Unable to login'));
    }
    // res.send(400);
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
