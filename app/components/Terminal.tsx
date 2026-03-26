"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Shell, ShellClass, ShellEvent, ShellGitInfo, ShellHistoryLine } from "../shell/portfolioShell";
import { Cmd, CmdArgs, CmdFail, CmdSuccess } from "./Cmd";
import { CmdLine } from "./CmdLine";
import { InputLine } from "./InputLine";
import { TextLine } from "./TextLine";

export type StartupCommand = {
  command: string;
  args: string[];
};

type Props = {
  shell: ShellClass;
  startupCommands?: StartupCommand[];
};

type ShellUiState = {
  cwd: string;
  gitInfo: ShellGitInfo;
};

function readShellUiState(shellProcess: Shell): ShellUiState {
  return {
    cwd: shellProcess.getCwd(),
    gitInfo: shellProcess.getGitInfo(),
  };
}

function decodeEscapedText(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type RenderLine = {
  kind: "command" | "output";
  key: string;
  exitCode: number;
  content: string;
};

const TerminalCommandRow = memo(function TerminalCommandRow({
  path,
  git,
  line,
}: {
  path: string;
  git: ShellGitInfo;
  line: RenderLine;
}) {
  const split = line.content.split(" ").filter((part) => part.length > 0);
  const command = split[0] || "";
  const argsText = split.slice(1).join(" ");
  const cmdNode = line.exitCode === 0
    ? <CmdSuccess>{command}</CmdSuccess>
    : <CmdFail>{command}</CmdFail>;

  return (
    <CmdLine path={path} git={git}>
      <Cmd>
        {cmdNode}
        <CmdArgs>{argsText}</CmdArgs>
      </Cmd>
    </CmdLine>
  )
});

const TerminalOutputRow = memo(function TerminalOutputRow({ content }: { content: string }) {
  return (
    <TextLine>
      <div className="whitespace-pre-wrap">{content}</div>
    </TextLine>
  )
});

function buildRenderLines(history: ShellHistoryLine[]): RenderLine[] {
  const lines: RenderLine[] = [];
  let outputBuffer: string[] = [];
  let outputExitCode = 0;
  let outputStartIndex = 0;

  function flushOutput() {
    if (outputBuffer.length === 0) {
      return;
    }

    lines.push({
      kind: "output",
      key: `out-${outputStartIndex}`,
      exitCode: outputExitCode,
      content: outputBuffer.join("\n"),
    });

    outputBuffer = [];
  }

  history.forEach((line, index) => {
    if (line.isCommand) {
      flushOutput();
      lines.push({
        kind: "command",
        key: `cmd-${index}`,
        exitCode: line.exitCode,
        content: line.content,
      });
      return;
    }

    if (outputBuffer.length === 0) {
      outputStartIndex = index;
      outputExitCode = line.exitCode;
    }

    outputBuffer.push(decodeEscapedText(line.content));
  });

  flushOutput();

  return lines;
}

export function Terminal({ shell, startupCommands = [] }: Props) {
  const shellRef = useRef<Shell | null>(null);

  if (!shellRef.current) {
    shellRef.current = new shell(() => { });
  }

  const [shellUiState, setShellUiState] = useState<ShellUiState>(() => readShellUiState(shellRef.current as Shell));
  const [renderLines, setRenderLines] = useState<RenderLine[]>(() => buildRenderLines((shellRef.current as Shell).getHistory()));
  const [activeCommandCount, setActiveCommandCount] = useState(0);
  const [typingText, setTypingText] = useState<string | undefined>(undefined);
  const [isTypingStartup, setIsTypingStartup] = useState(false);
  const [inputFocusSignal, setInputFocusSignal] = useState(0);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const hasRunStartup = useRef(false);

  const typeOnInputLine = useCallback(async (text: string, characterDelayMs = 30) => {
    setIsTypingStartup(true);
    setTypingText("");

    for (let i = 0; i < text.length; i++) {
      setTypingText((prev) => `${prev ?? ""}${text[i]}`);
      await delay(characterDelayMs);
    }

    await delay(120);
    setTypingText(undefined);
    setIsTypingStartup(false);
  }, []);

  const runCommand = useCallback(async (command: string, args: string[]) => {
    if (!shellRef.current) {
      return;
    }

    const shellProcess = shellRef.current;
    const normalizedCommand = command.trim();
    if (!normalizedCommand) {
      return;
    }

    if (normalizedCommand === "clear") {
      shellProcess.clearHistory();
      return;
    }

    setActiveCommandCount((prev) => prev + 1);

    try {
      await Promise.resolve(shellProcess.run(normalizedCommand, args));
    } finally {
      setActiveCommandCount((prev) => Math.max(0, prev - 1));
    }
  }, []);

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

  useEffect(scrollBottom, [renderLines]);

  useEffect(() => {
    if (!shellRef.current) {
      return;
    }

    const shellProcess = shellRef.current;
    const syncShellState = () => {
      setRenderLines(buildRenderLines(shellProcess.getHistory()));
      setShellUiState(readShellUiState(shellProcess));
    };

    syncShellState();

    return shellProcess.subscribe((event: ShellEvent) => {
      if (event.type === "append") {
        setRenderLines((prev) => {
          const next = [...prev];

          event.lines.forEach((historyLine) => {
            if (historyLine.isCommand) {
              next.push({
                kind: "command",
                key: `cmd-append-${next.length}`,
                exitCode: historyLine.exitCode,
                content: historyLine.content,
              });
              return;
            }

            const decodedContent = decodeEscapedText(historyLine.content);
            const lastLine = next[next.length - 1];

            if (lastLine && lastLine.kind === "output") {
              next[next.length - 1] = {
                ...lastLine,
                content: `${lastLine.content}\n${decodedContent}`,
              };
              return;
            }

            next.push({
              kind: "output",
              key: `out-append-${next.length}`,
              exitCode: historyLine.exitCode,
              content: decodedContent,
            });
          });

          return next;
        });
        return;
      }

      setShellUiState(readShellUiState(shellProcess));
      setRenderLines(buildRenderLines(shellProcess.getHistory()));
    });
  }, []);

  useEffect(() => {
    if (hasRunStartup.current) {
      return;
    }

    hasRunStartup.current = true;

    async function runStartupCommands() {
      for (const startupCommand of startupCommands) {
        const startupInput = [startupCommand.command, ...startupCommand.args].join(" ").trim();
        await typeOnInputLine(startupInput, 100);
        await runCommand(startupCommand.command, startupCommand.args);
      }

      setInputFocusSignal((prev) => prev + 1);
    }

    void runStartupCommands();
  }, [runCommand, startupCommands, typeOnInputLine]);

  return (
    <ScrollArea className="z-50 w-full h-full p-1 text-sm font-[SpaceMono] bg-slate-900 bg-opacity-80">

      {renderLines.map((line) => {
        if (line.kind === "command") {
          return (
            <div key={line.key}>
              <TerminalCommandRow path={shellUiState.cwd} git={shellUiState.gitInfo} line={line} />
            </div>
          )
        }

        return (
          <div key={line.key}>
            <TerminalOutputRow content={line.content} />
          </div>
        )
      })}
      {activeCommandCount === 0 || isTypingStartup ? (
        <InputLine
          path={shellUiState.cwd}
          git={shellUiState.gitInfo}
          submit={executeText}
          valueOverride={typingText}
          isLocked={isTypingStartup}
          focusSignal={inputFocusSignal}
        />
      ) : null}
      <div ref={scrollRef} ></div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  )
}
