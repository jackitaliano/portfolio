export type ShellStdout = (line: string) => void;

export type ShellGitInfo = {
  enabled: boolean;
  branch: string;
  changes: boolean;
  staged: boolean;
};

export type ShellHistoryLine = {
  isCommand: boolean;
  exitCode: number;
  content: string;
};

export type ShellEvent =
  | {
    type: "append";
    lines: ShellHistoryLine[];
  }
  | {
    type: "write";
  };

export interface Shell {
  run(command: string, args: string[]): number | Promise<number>;
  getCwd(): string;
  getGitInfo(): ShellGitInfo;
  getHistory(): ShellHistoryLine[];
  clearHistory(): void;
  subscribe(listener: (event: ShellEvent) => void): () => void;
}

export type ShellClass = new (echo: ShellStdout) => Shell;

export type Command = (
  args: string[],
  echo: ShellStdout
) => number | Promise<number>;

const shellHelpLines = [
  "Jack's Portfolio CLI Help",
  "",
  "Type a command for more info.",
  "",
  "\twhois - view username",
  "\tcontact - view contact info",
  "\texperience - view overview of experience",
  "\tprojects - view overview of projects",
  "\thelp - see this menu",
];

const shellCommands: Record<string, Command> = {
  help: (_, echo) => {
    shellHelpLines.forEach((line) => echo(line));
    return 0
  },
  whois: (_, echo) => {
    echo("Jack Italiano")
    return 0;
  },
  contact: (_, echo) => {
    echo("Email: jackitaliano12@gmail.com")
    echo("Phone: (847) 477-8066")
    return 0;
  },
  experience: (_, echo) => {
    echo( "NASA - AI/ML & Web Software Engineering Intern" )
    echo( "State Farm - Software Engineering Intern" )
    echo( "Holocron Tech - AI/ML Developer" )
    return 0;
  },
  repeat: async (args, echo) => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    let num = 0;
    if (args.length == 0) {
      num = 5
    }
    else if (args.length == 1) {
      if (!Number.isFinite(Number(args[0]))) {
        echo(`'${args[0]}' is not a number`)
        return 1
      }

      num = Number(args[0])
    }


    for (let i = 0; i < num; i++) {
      echo("test " + i)
      await delay(1);
    }

    return 0
  }
};

export class PortfolioShell implements Shell {
  private readonly echo: ShellStdout;
  private cwd = "~";
  private gitInfo: ShellGitInfo = {
    enabled: false,
    branch: "",
    changes: false,
    staged: false,
  };
  private history: ShellHistoryLine[] = [];
  private listeners: Set<(event: ShellEvent) => void> = new Set();

  constructor(echo: ShellStdout) {
    this.echo = echo;
  }

  run(command: string, args: string[]): number | Promise<number> {
    const normalizedCommand = command.trim().toLowerCase();
    const commandContent = [command.trim(), ...args].join(" ").trim();

    const shellCommand = shellCommands[normalizedCommand];

    if (!shellCommand) {
      const failMessage = `'${command}': command not found`;
      this.appendHistory({
        isCommand: true,
        exitCode: 1,
        content: commandContent,
      });
      this.appendHistory({
        isCommand: false,
        exitCode: 1,
        content: failMessage,
      });
      this.echo(failMessage);
      return 1;
    }

    this.appendHistory({
      isCommand: true,
      exitCode: 0,
      content: commandContent,
    });

    const echo = (line: string) => {
      this.appendHistory({
        isCommand: false,
        exitCode: 0,
        content: line,
      });
      this.echo(line);
    };

    const exitCode = shellCommand(args, echo);

    if (exitCode instanceof Promise) {
      return exitCode
        .then((resolvedExitCode) => resolvedExitCode)
        .catch((error) => {
          const errorMessage = error instanceof Error ? error.message : "Command failed";
          this.appendHistory({
            isCommand: false,
            exitCode: 1,
            content: errorMessage,
          });
          this.echo(errorMessage);

          return 1;
        });
    }

    return exitCode;
  }

  getCwd(): string {
    return this.cwd;
  }

  getGitInfo(): ShellGitInfo {
    return this.gitInfo;
  }

  getHistory(): ShellHistoryLine[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
    this.notify({ type: "write" });
  }

  subscribe(listener: (event: ShellEvent) => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private appendHistory(line: ShellHistoryLine): void {
    this.history.push(line);
    this.notify({ type: "append", lines: [line] });
  }

  private notify(event: ShellEvent): void {
    this.listeners.forEach((listener) => listener(event));
  }
}
