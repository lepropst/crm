import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { credentials, getCredentials, UserContext } from "../utilities/auth";
import axios from "axios";
import Head from "next/head";

const routes = [
  { route: "/", label: "Home" },
  { label: "Todos", route: "/todo-lists" },
  { label: "Notebooks", route: "/notebooks" },
  { label: "Login", route: "/login" },
];
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let name = router.pathname;

  const logout = async (event: any) => {
    const response = await axios.post("http://localhost:3000/api/logout/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    router.reload();
  };

  if (name == "/") {
    name = "Home";
  } else {
    name = name.replaceAll("/", "").trim();
    name = name[0].toUpperCase() + name.substring(1);
  }

  return (
    <>
      <Head>
        <script
          defer
          src="/node_modules/@fortawesome/fontawesome-free/js/solid.js"
        ></script>
      </Head>
      <nav className="flex items-center justify-between flex-wrap bg-primarydark p-6 nav-hover-container">
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="font-semibold text-xl ">{name}</span>
        </div>
        <div
          className={`nav-hover-item w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="text-sm lg:flex lg:ml-4 lg:flex-grow">
            {routes.map((e, i) => (
              <li key={`${e}-${i}`}>
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  href={e.route}
                >
                  {e.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                href={"/"}
                onClick={logout}
              >
                logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Component {...pageProps} />
    </>
  );
}
