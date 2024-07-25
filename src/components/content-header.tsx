import React from "react";

import { cn } from "@/lib/utils";

const ContentHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn(className, "bg-muted flex h-9 items-center justify-between border-b px-2")}>
        {children}
      </div>
    );
  },
);
ContentHeader.displayName = "ContentHeader";

const ContentTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className }, ref) => {
    return (
      <h3 ref={ref} className={cn(className, "align-middle text-sm")}>
        {children}
      </h3>
    );
  },
);
ContentTitle.displayName = "ContentTitle";

export { ContentHeader, ContentTitle };
