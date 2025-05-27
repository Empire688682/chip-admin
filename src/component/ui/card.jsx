import React from "react";
import clsx from "clsx";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        "bg-red-400 rounded-2xl shadow-md border-t border-gray-200 p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={clsx("space-y-1", className)} {...props}>
      {children}
    </div>
  );
}
