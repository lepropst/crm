import { withIronSessionApiRoute } from "iron-session/next";
import Axios from "../../utilities/axios";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    let user = req.session.user;
    let url = "";
    console.log(req.body);
    if (user) {
      try {
        url = `${req.body.preped ? req.body.prepend : "unendlich"}/${
          req.body.type
        }/`;
        const resp = await Axios.getInstance().axios.post(
          url,
          {
            ...req.body,
            owner: user.id,
          },
          { headers: { Authorization: `Token ${user.token}` } }
        );
        console.log("axios request sent");
        console.log(resp);
        res.send({ ok: true });
      } catch (e) {
        console.log("error makig notebook");
        console.log(e);
        res.status(400).json({ ok: false });
      }
    }
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
