import React from "react";

export const Textarea = React.forwardRef(({ className = "", rows = 3, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={[
      "w-full rounded-md border border-border bg-background text-foreground",
      "px-3 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
      "resize-y",
      className,
    ].join(" ")}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export default Textarea;
