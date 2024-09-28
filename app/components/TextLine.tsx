import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export function TextLine({ children }: Props) {
  return (
    <div className="mb-4 text-wrap">
      {children}
    </div>
  )
}
