import axios from "axios";

import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";

import { withSessionRoute } from "../../utilities/withSession";

export const handler: NextApiHandler<any> = async (req, res) => {
  // get user from database then:
  console.log("api login route hit");
  console.log(req.body.body.username);
  req.session.user = {
    // login to api here
    username: req.body.body.username,
    password: req.body.body.password,
    token: "",
  };
  let error = false;
  try {
    const axi = axios;
    const response = await axi.post("http://localhost:1337/crm/auth/login/", {
      username: req.body.body.username,
      password: req.body.body.password,
    });
    console.log(response);
    console.log(response);
    req.session.user.token = response.data;
  } catch (e: any) {
    console.log("Error");
    console.log(e);
    error = true;
  }
  await req.session.save();
  if (error) {
    res.redirect("/login");
  } else {
    res.send("Logged in");
  }
};
export default withSessionRoute(handler);
