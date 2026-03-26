import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export function CmdSuccess({ children }: Props) {
  return (
    <span className="text-green-600">
      {children}
    </span>
  )
}

export function CmdFail({ children }: Props) {
  return (
    <span className="text-red-600">
      {children}
    </span>
  )
}

export function CmdArgs({ children }: Props) {
  return (
    <span>
      {children ? <span>&nbsp;</span> : ""}
      {children}
    </span>
  )
}

type CmdProps = {
  children:
  | [ReactElement<typeof CmdSuccess> | ReactElement<typeof CmdFail>, ReactElement<typeof CmdArgs>]
  | ReactElement<typeof CmdSuccess> | ReactElement<typeof CmdFail>
}

export function Cmd({ children }: CmdProps) {
  return (
    <div className="text-wrap whitespace-pre">
      {children}
    </div>
  )
}
