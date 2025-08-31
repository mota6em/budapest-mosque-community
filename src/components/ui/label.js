import React from "react";

export const Label = ({ className = "", ...props }) => (
  <label
    className={["text-sm font-medium text-foreground", className].join(" ")}
    {...props}
  />
);

export default Label;
