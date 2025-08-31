import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={[
      "w-full rounded-md border border-border bg-background text-foreground",
      "px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
      className,
    ].join(" ")}
    {...props}
  />
));
Input.displayName = "Input";

export default Input;
