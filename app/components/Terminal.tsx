"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Shell } from "../shell/portfolioShell";
import { Cmd, CmdArgs, CmdFail, CmdSuccess } from "./Cmd";
import { CmdLine } from "./CmdLine";
import { InputLine } from "./InputLine";
import { TextLine } from "./TextLine";

export type StartupCommand = {
  command: string;
  args: string[];
};

type Props = {
  shell: Shell;
  startupCommands?: StartupCommand[];
};

const gitInfo = {
  enabled: false,
  branch: "",
  changes: false,
  staged: false,
};

function decodeEscapedText(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r");
}

export function Terminal({ shell, startupCommands = [] }: Props) {
  const [history, setHistory] = useState<Array<ReactNode>>([]);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const hasRunStartup = useRef(false);

  const runCommand = useCallback(async (command: string, args: string[]) => {
    const normalizedCommand = command.trim();
    if (!normalizedCommand) {
      return;
    }

    if (normalizedCommand === "clear") {
      setHistory([]);
      return;
    }

    const argsText = args.join(" ");
    const stdoutLines: string[] = [];

    const exitCode = await Promise.resolve(
      shell(normalizedCommand, args, (line) => {
        stdoutLines.push(line);
      })
    );

    let cmdNode = <CmdSuccess>{normalizedCommand}</CmdSuccess>;
    if (exitCode !== 0) {
      cmdNode = <CmdFail>{normalizedCommand}</CmdFail>;
    }

    const argsNode = <CmdArgs>{argsText}</CmdArgs>;
    const cmdLineNode = <CmdLine path="~" git={gitInfo}>
      <Cmd>
        {cmdNode}
        {argsNode}
      </Cmd>
    </CmdLine>;

    const decodedStdout = stdoutLines.map((line) => decodeEscapedText(line));
    const outputNode = decodedStdout.length > 0 ? (
      <TextLine>
        <div className="whitespace-pre-wrap">{decodedStdout.join("\n")}</div>
      </TextLine>
    ) : null;

    setHistory((prev) => {
      if (!outputNode) {
        return [...prev, cmdLineNode];
      }

      return [...prev, cmdLineNode, outputNode];
    });
  }, [shell]);

  async function executeText(text: string) {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    const split = trimmedText.split(" ").filter((part) => part.length > 0);
    const command = split[0];
    const args = split.slice(1);
    await runCommand(command, args);
  }

  function scrollBottom() {
    if (!scrollRef?.current) {
      return;
    }
    scrollRef.current.scrollIntoView(true);
  }

  useEffect(scrollBottom, [history]);

  useEffect(() => {
    if (hasRunStartup.current) {
      return;
    }

    hasRunStartup.current = true;

    async function runStartupCommands() {
      for (const startupCommand of startupCommands) {
        await runCommand(startupCommand.command, startupCommand.args);
      }
    }

    void runStartupCommands();
  }, [runCommand, startupCommands]);

  return (
    <ScrollArea className="z-50 w-full h-full p-1 text-sm font-[SpaceMono] bg-slate-900 bg-opacity-80">

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
