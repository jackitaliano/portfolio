export type ShellStdout = (line: string) => void;

export type Shell = (
  command: string,
  args: string[],
  echo: ShellStdout
) => number | Promise<number>;

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
};


export const portfolioShell: Shell = (command, args, echo) => {
  void args;
  const normalizedCommand = command.trim().toLowerCase();

  const shellCommand = shellCommands[normalizedCommand];

  if (!shellCommand) {
    echo(`'${command}': command not found`);
    return 1;
  }

  const exitCode = shellCommand(args, echo);

  return exitCode;
};
