import { Menu } from "@headlessui/react";
import React, { PropsWithChildren, Ref } from "react";

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<any>,
    ref: Ref<HTMLDivElement>
  ) => (
    <Menu
      {...props}
      as="div"
      ref={ref}
      className={
        "relative space-x-3 p-3 m-2 mt-0 mx-0 border border-b-primarydark"
      }
    />
  )
);
