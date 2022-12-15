import { withIronSessionApiRoute } from 'iron-session/next';
import { Axios } from '@frontend-workspace/singletons';

export default withIronSessionApiRoute(
  async function loginRoute(req: any, res) {
    const user = req.session.user;
    console.log(req.body);
    if (user) {
      const { body, session } = req;
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
