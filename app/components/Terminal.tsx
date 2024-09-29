"use client"; import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CmdLine } from "./CmdLine"
import { InputLine } from "./InputLine"
import { ReactNode, useEffect, useRef, useState } from "react";
import { HelpMenu } from "./HelpMenu";
import { Starter } from "./Starter";
import { WhoIs } from "./WhoIs";
import { Contact } from "./Contact";
import { Projects } from "./Projects";
import { Unknown } from "./Unknown";
import { Experience } from "./Experience";
import { Cmd, CmdArgs, CmdFail, CmdSuccess } from "./Cmd";

export function Terminal() {
  const [history, setHistory] = useState<Array<ReactNode>>([<div key={0}><Starter /></div>]);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const gitInfo = {
    enabled: false,
    branch: "",
    changes: false,
    staged: false
  }

  function getCommandOutput(cmdInput: { cmd: string, args: string }): { node: ReactNode, success: boolean } {
    const success = true;
    switch (cmdInput.cmd) {
      case "whois":
        return { node: <WhoIs />, success }
      case "contact":
        return { node: <Contact />, success }
      case "experience":
        return { node: <Experience />, success }
      case "projects":
        return { node: <Projects />, success }
      case "help":
        return { node: <HelpMenu />, success }
      default:
        return { node: <Unknown text={cmdInput.cmd} />, success: false }
    }
  }

  function executeText(text: string) {
    if (text === "clear") {
      setHistory([]);
      return;
    }

    const split = text.split(" ");
    console.log("split: ", split)
    const cmd = split[0];
    const args = split.length > 1 ? split.slice(1).join(" ") : "";
    console.log("args: ", args);
    const cmdInput = { cmd, args }

    const output = getCommandOutput(cmdInput);
    const outputNode = output.node;

    let cmdNode = <CmdSuccess>{cmdInput.cmd}</CmdSuccess>
    if (!output.success) {
      cmdNode = <CmdFail>{cmdInput.cmd}</CmdFail>
    }

    const argsNode = <CmdArgs>{cmdInput.args}</CmdArgs>
    const cmdLineNode = <CmdLine path="~" git={gitInfo}>
      <Cmd>
        {cmdNode}
        {argsNode}
      </Cmd>
    </CmdLine>;

    console.log(cmdLineNode)

    setHistory((prev) => {
      prev.push(cmdLineNode);
      prev.push(outputNode);
      const newHistory = [...prev];
      return newHistory;
    });
  }

  function scrollBottom() {
    if (!scrollRef?.current) {
      return;
    }
    scrollRef.current.scrollIntoView(true);
  }

  useEffect(scrollBottom, [history]);
  return (
    <ScrollArea className="z-50 w-full h-full p-1 text-sm font-[SpaceMono] backdrop-blur-lg">

      {history.map((node, i) =>
        <div key={i}>
          {node}
        </div>
      )}
      <InputLine path="~" git={gitInfo} submit={executeText} />
      <div ref={scrollRef} ></div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  )
}
