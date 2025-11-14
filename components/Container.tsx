import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("max-w-screen-x1 max-aouto px-4", className)}>{children}</div>;
};

export default Container;
