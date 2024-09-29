import { ExperienceShort } from "./ExperienceShort";
import { CmdLine } from "./CmdLine";
import { Headline } from "./Headline";
import { WhoIs } from "./WhoIs";
import { HelpMenu } from "./HelpMenu";
import { Cmd, CmdArgs, CmdSuccess } from "./Cmd";
import { ContactShort } from "./ContactShort";

export function Starter() {
  const gitInfo = {
    enabled: false,
    branch: "",
    changes: false,
    staged: false
  }

  return (
    <div>
      <CmdLine path="~" git={gitInfo}>
        <Cmd>
          <CmdSuccess>
            whois
          </CmdSuccess>
        </Cmd>
      </CmdLine>
      <WhoIs />
      <CmdLine path="~" git={gitInfo}>
        <Cmd>
          <CmdSuccess>
            headline
          </CmdSuccess>
        </Cmd>
      </CmdLine>
      <Headline />
      <CmdLine path="~" git={gitInfo}>
        <Cmd>
          <CmdSuccess>
            experience
          </CmdSuccess>
          <CmdArgs>
            -s
          </CmdArgs>
        </Cmd>
      </CmdLine>
      <ExperienceShort />
      <CmdLine path="~" git={gitInfo}>
        <Cmd>
          <CmdSuccess>contact</CmdSuccess>
          <CmdArgs>
            -s
          </CmdArgs>
        </Cmd>
      </CmdLine>
      <ContactShort />
      <CmdLine path="~" git={gitInfo}>
        <Cmd>
          <CmdSuccess>help</CmdSuccess>
        </Cmd>
      </CmdLine>
      <HelpMenu />
    </div>
  )
}
