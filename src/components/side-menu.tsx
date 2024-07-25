import * as SeparatorPrimitive from "@radix-ui/react-separator";
import React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SideMenuButtonItem = React.forwardRef<HTMLButtonElement, ButtonProps & { primary: boolean }>(
  ({ children, primary, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className="hidden lg:inline-block"
        variant={primary ? "image-icon-active" : "image-icon-none"}
        size="icon-sm"
        {...props}
      >
        {children}
      </Button>
    );
  },
);
SideMenuButtonItem.displayName = "SideMenuButtonItem";

const SideMenuButtons = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className="flex gap-2" {...props}>
        {children}
      </div>
    );
  },
);
SideMenuButtons.displayName = "SideMenuButtons";

const SideMenuContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className }, ref) => {
    return (
      <aside className={cn("border-box hidden h-full w-72 border p-4 lg:inline-block", className)}>{children}</aside>
    );
  },
);
SideMenuContent.displayName = "SideMenuContent";

const SideMenuTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className }, ref) => {
    return (
      <h4 ref={ref} className={cn("mb-2", className)}>
        {children}
      </h4>
    );
  },
);
SideMenuTitle.displayName = "SideMenuTitle";

const SideMenuSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className }, ref) => {
  return <Separator ref={ref} className={cn("mb-2", className)} />;
});
SideMenuSeparator.displayName = "SideMenuSeparator";

export { SideMenuButtonItem, SideMenuButtons, SideMenuContent, SideMenuSeparator, SideMenuTitle };
