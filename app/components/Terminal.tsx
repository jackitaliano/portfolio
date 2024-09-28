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

export function Terminal() {
  const [history, setHistory] = useState<Array<ReactNode>>([<div key={0}><Starter /></div>]);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const gitInfo = {
    enabled: false,
    branch: "",
    changes: false,
    staged: false
  }

  function getCommandOutput(text: string): ReactNode {
    switch (text) {
      case "whois":
        return <WhoIs />
      case "contact":
        return <Contact />
      case "experience":
        return <Experience />
      case "projects":
        return <Projects />
      case "help":
        return <HelpMenu />
      default:
        return <Unknown text={text} />
    }
  }

  function executeText(text: string) {
    console.log("execute: ", text);
    const newNode = <CmdLine path="~" git={gitInfo}>{text}</CmdLine>;
    const outputNode = getCommandOutput(text);

    if (text === "clear") {
      setHistory([]);
      return;
    }

    setHistory((prev) => {
      prev.push(newNode);
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
    <ScrollArea className="w-full h-full p-1">

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
