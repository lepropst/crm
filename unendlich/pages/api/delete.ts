import { withIronSessionApiRoute } from "iron-session/next";

import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import Axios from "../../utilities/axios";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    let error = false;

    try {
      console.log(req.body);
      let tmp1 = await Axios.getInstance().axios.delete(
        `${req.body.prepend ? req.body.prepend : "unendlich"}/${
          req.body.type
        }/${req.body.id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${req.session.user?.token}`,
          },
        }
      );
      const toke = tmp1;

      console.log(toke);
      res.send({ ok: true });
    } catch (e) {
      console.log("error logging in");
      console.log(e);
      error = true;
      res.status(400).json(new Error("Unable to login"));
    }
    // res.send(400);
  },
  {
    password:
      process.env.COOKIE_PASSWORD ||
      "complex_password_at_least_32_characters_long",
    cookieName: "unendlich_cookie", // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
