import React, { PropsWithChildren, Ref } from "react";
type OrNull<T> = T | null;
type BaseProps = {
  icon: string;
};
export const Icon = React.forwardRef(
  (
    { icon, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => <i {...props} className={`fa-solid ${icon}`} />
);
