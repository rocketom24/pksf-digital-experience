import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** Only for a container that is itself an anchor target. */
  id?: string;
  className?: string;
};

/** 12/8/4-column editorial grid container — see docs/art-direction.md "Grid". */
export function Container({ children, id, className = "" }: ContainerProps) {
  return (
    <div
      id={id}
      className={`mx-auto w-full max-w-[1440px] px-4.5 sm:px-6 md:px-6 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
