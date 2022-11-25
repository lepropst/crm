import React, { useState } from "react";
import { Outlet, Routes, useLocation, useRevalidator } from "react-router";
import { Link, NavLink, useFetchers } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import routes from "./routes";
export function Element() {
  let location = useLocation();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ["loading", "submitting"].includes(f.state)
  );
  const [sideBar, openSideBar] = useState(false);
  const ElementRoutes = routes.map((e, i) => (
    <li className="flex justify-center text-base font-normal text-gray-900">
      <NavLink
        to={`/${e.label.toLowerCase()}`}
        style={{}}
        className={({ isActive, isPending }) =>
          isActive ? "underline" : isPending ? "pending" : ""
        }
      >
        <i className={e.icon} />
      </NavLink>
    </li>
  ));
  const ClosedElement = () => {
    return <div onClick={() => openSideBar(!sideBar)}>none</div>;
  };
  return (
    <>
      <nav
        className={`h-6 opacity-25 hover:opacity-100 hover:h-auto w-8 absolute top-0 right-0 ml-auto m-3 bg-teal-100 overflow-y-auto rounded`}
      >
        <ul className="flex flex-col justify-center">
          {/* onClick={openSideBar(!sideBar)} */}
          {
            <>
              <li
                className="flex justify-center h-6 text-base font-normal text-gray-900"
                onClick={() => openSideBar(!sideBar)}
              >
                <NavLink to={location}>
                  <i className="fas fa-arrow-down" />
                </NavLink>
              </li>
              {ElementRoutes.map((e) => e)}
            </>

            // <button onClick={() => openSideBar(true)}>"closed"</button>
          }
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
export default Element;
