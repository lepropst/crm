import { forwardRef, PropsWithChildren, Ref } from "react";

export const Button = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & { children: any; className: string }
    >,
    ref: Ref<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className={`cursor-pointer ${
        reversed
          ? active
            ? "text-white"
            : "text-primarylight"
          : active
          ? "text-black"
          : "text-primarylight"
      } `}
    />
  )
);
