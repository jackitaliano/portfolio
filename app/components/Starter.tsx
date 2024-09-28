import { ExperienceShort } from "./ExperienceShort";
import { CmdLine } from "./CmdLine";
import { Headline } from "./Headline";
import { WhoIs } from "./WhoIs";
import { HelpMenu } from "./HelpMenu";

export function Starter() {
  const gitInfo = {
    enabled: false,
    branch: "",
    changes: false,
    staged: false
  }

  return (
    <div>
      <CmdLine path="~" git={gitInfo}>whois</CmdLine>
      <WhoIs />
      <CmdLine path="~" git={gitInfo}>headline</CmdLine>
      <Headline />
      <CmdLine path="~" git={gitInfo}>experience -s</CmdLine>
      <ExperienceShort />
      <CmdLine path="~" git={gitInfo}>help</CmdLine>
      <HelpMenu />
    </div>
  )
}
