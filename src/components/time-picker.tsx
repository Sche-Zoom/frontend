"use client";

import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function TimePicker({ value, className, ...rest }: InputProps) {
  return (
    <Input
      type="time"
      value={value}
      className={cn(buttonVariants({ variant: "outline" }), "w-fit cursor-pointer font-normal", className)}
      {...rest}
    />
  );
}
