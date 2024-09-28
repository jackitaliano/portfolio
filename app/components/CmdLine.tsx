import { ReactNode } from "react";
import { Path } from "./Path";

type Props = {
  path: string;
  git?: {
    enabled: boolean;
    branch: string;
    changes: boolean;
    staged: boolean;
  };
  children: ReactNode
}

export function CmdLine({ path, git, children }: Props) {
  return (
    <div className="flex flex-wrap">
      <div className="pe-2">
        <Path path={path} git={git} />
      </div>
      <div className="text-wrap"> {children}
      </div>
    </div>
  )
}
