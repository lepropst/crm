// pages/api/logout.ts

import { withIronSessionApiRoute } from "iron-session/next";
import Axios from "../../utilities/axios";

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    console.log(req.session.user);

    const server_response = Axios.getInstance()
      .axios.post(
        "/auth/logout/",
        {
          password: req.session.user?.password,
          username: req.session.user?.username,
        },
        {
          headers: { Authorization: `Token ${req.session.user?.token}` },
        }
      )
      .then((result: any) => {
        console.log(result);
      });
    req.session.destroy();
    console.log("session destroyed");
    res.send({ ok: true });
  },
  {
    password:
      process.env.COOKIE_PASSWORD ||
      "complex_password_at_least_32_characters_long",
    cookieName: "unendlich_cookie",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
