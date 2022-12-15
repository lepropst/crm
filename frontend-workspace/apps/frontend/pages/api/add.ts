import { withIronSessionApiRoute } from 'iron-session/next';
import { api_add } from '@frontend-workspace/api';

export default withIronSessionApiRoute(
  async function loginRoute(req: any, res) {
    const user = req.session.user;
    console.log(req.body);
    if (user) {
      api_add(req.body, req.user, res);
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
