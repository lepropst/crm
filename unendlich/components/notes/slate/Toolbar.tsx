import React, { PropsWithChildren, Ref } from "react";
export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<any>,
    ref: Ref<HTMLDivElement | null>
  ) => <div {...props} ref={ref} className={"inline-block ml-8"} />
);

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<any>,
    ref: Ref<HTMLDivElement | null>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={`relative

          -m-8
          border border-bottom border-primarydark
          mb-8;
        ${className}`}
    />
  )
);
