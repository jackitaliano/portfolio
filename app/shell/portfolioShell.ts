export type ShellStdout = (line: string) => void;

export type Shell = (
  command: string,
  args: string[],
  stdout: ShellStdout
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

const shellOutputs: Record<string, string[]> = {
  whois: ["Jack Italiano"],
  contact: ["Email: jackitaliano12@gmail.com", "Phone: (847) 477-8066"],
  experience: [
    "NASA - AI/ML & Web Software Engineering Intern",
    "State Farm - Software Engineering Intern",
    "Holocron Tech - AI/ML Developer",
  ],
  projects: [
    "BIDARA - Open-Source Aerospace AI Research and Design Tool",
    "OAIT - OpenAI Tools, a CLI Utility",
    "Audio Studio Code - Speech-To-Text IDE",
    "Run `projects -m` for more projects",
  ],
  help: shellHelpLines,
};

export const portfolioShell: Shell = (command, args, stdout) => {
  void args;
  const normalizedCommand = command.trim().toLowerCase();
  const lines = shellOutputs[normalizedCommand];

  if (!lines) {
    stdout(`'${command}': command not found`);
    return 1;
  }

  lines.forEach((line) => stdout(line));
  return 0;
};
