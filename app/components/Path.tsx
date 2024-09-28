
type Props = {
  path: string;
  git?: {
    enabled: boolean;
    branch: string;
    changes: boolean;
    staged: boolean;
  }
}

export function Path({ path, git }: Props) {
  if (!git) {
    git = {
      enabled: false,
      branch: "",
      changes: false,
      staged: false,
    }
  }

  return (
    <div className="flex flex-nowrap gap-x-2">
      <p className="text-blue-400 text-nowrap">{path}</p>
      {git.enabled ?
        <div className="flex flex-nowrap ">
          <p className="text-blue-600">(</p>
          <div className="flex flex-nowrap gap-x-2">
            <p className={`${git.changes ? "text-red-600" : git.staged ? "text-yellow-600" : ""} text-nowrap`}>{git.branch} {git.changes ? "?" : ""} {git.staged ? "+" : ""}</p>
          </div>
          <p className="text-blue-600">)</p>
        </div>
        : ""
      }
      <p className="text-blue-400">{'$:'}</p>
    </div>
  )
}
