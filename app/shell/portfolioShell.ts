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

export interface Shell {
  run(command: string, args: string[]): number | Promise<number>;
  getCwd(): string;
  getGitInfo(): ShellGitInfo;
  getHistory(): ShellHistoryLine[];
  clearHistory(): void;
  subscribe(listener: () => void): () => void;
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
  repeat: async (_, echo) => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    for (let i = 0; i < 5; i++) {
      echo("test " + i)
      await delay(1000);
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
  private listeners: Set<() => void> = new Set();

  constructor(echo: ShellStdout) {
    this.echo = echo;
  }

  run(command: string, args: string[]): number | Promise<number> {
    const normalizedCommand = command.trim().toLowerCase();
    const commandContent = [command.trim(), ...args].join(" ").trim();
    const commandIndex = this.history.length;

    this.history.push({
      isCommand: true,
      exitCode: 0,
      content: commandContent,
    });
    this.notify();

    const echo = (line: string) => {
      this.history.push({
        isCommand: false,
        exitCode: 0,
        content: line,
      });
      this.echo(line);
      this.notify();
    };

    const finalizeCommand = (exitCode: number) => {
      this.history[commandIndex] = {
        ...this.history[commandIndex],
        exitCode,
      };
      this.notify();

      return exitCode;
    };

    const shellCommand = shellCommands[normalizedCommand];

    if (!shellCommand) {
      const failMessage = `'${command}': command not found`;
      echo(failMessage);
      return finalizeCommand(1);
    }

    const exitCode = shellCommand(args, echo);

    if (exitCode instanceof Promise) {
      return exitCode
        .then((resolvedExitCode) => finalizeCommand(resolvedExitCode))
        .catch((error) => {
          const errorMessage = error instanceof Error ? error.message : "Command failed";
          this.history.push({
            isCommand: false,
            exitCode: 1,
            content: errorMessage,
          });
          this.echo(errorMessage);
          this.notify();

          return finalizeCommand(1);
        });
    }

    return finalizeCommand(exitCode);
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
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}
