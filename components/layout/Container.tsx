import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** 12/8/4-column editorial grid container — see docs/art-direction.md "Grid". */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-4.5 sm:px-6 md:px-6 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
