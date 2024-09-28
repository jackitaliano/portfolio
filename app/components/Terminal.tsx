import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TextLine } from "./TextLine"
import { CmdLine } from "./CmdLine"
import { InputLine } from "./InputLine"

export function Terminal() {
  const gitInfo = {
    enabled: true,
    branch: "main",
    changes: true,
    staged: false
  }

  return (
    <div>
      <div className="w-full h-5 rounded-t-lg border-slate-600 bg-slate-600 py-auto flex">
        <div className="w-3 h-3 rounded-full bg-red-700 my-auto mx-1"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-700 my-auto mx-1"></div>
        <div className="w-3 h-3 rounded-full bg-green-700 my-auto mx-1"></div>
      </div>
      <Card className="w-full h-[600px] bg-slate-900 rounded-t-none border-slate-600 shadow-slate-500 text-white bg-opacity-40 overflow-x-hidden">

        <div className="w-full h-full overflow-y-hidden">
          <ScrollArea className="w-full h-full px-1">

            <CmdLine path="~">cd ./info; chmod +x ./info; cp ./info ~/.local/bin;</CmdLine>
            <CmdLine path="~/info" git={gitInfo}>info user</CmdLine>
            <TextLine>
              <p>Jack Italiano</p>
            </TextLine>

            <CmdLine path="~/info" git={gitInfo}>info headline</CmdLine>
            <TextLine>
              <p>A Full-Stack Web and Application Developer soon to be graduating from The Ohio State University with a B.S. Computer Science and Engineering.</p>
            </TextLine>

            <CmdLine path="~/info" git={gitInfo}>info experience</CmdLine>
            <TextLine>
              <p>- NASA: AI/ML & Web Software Engineering Intern</p>
              <p>- State Farm: Software Engineering Intern</p>
              <p>- Holocron Tech: AI/ML Devloper</p>
            </TextLine>

            <CmdLine path="~/info" git={gitInfo}>info contact</CmdLine>
            <TextLine>
              <p>- Email: jackitaliano12@gmail.com</p>
              <p>- Phone: (847) 477-8066</p>
            </TextLine>

            <CmdLine path="~/info" git={gitInfo}>info -h</CmdLine>
            <TextLine>
              <p>Jack Italiano Info Tool</p>
              <p className="ps-4">user</p>
              <p className="ps-4">contact</p>
              <p className="ps-4">experience</p>
              <p className="ps-4">projects</p>
            </TextLine>
            <InputLine path="~/info" git={gitInfo}><p></p></InputLine>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </Card>
    </div>
  )
}
