"use client";

import { BackgroundImage } from './components';
import { Terminal, Notes, Image } from './apps';
import { Window, WindowManager } from './gui';
import { PortfolioShell } from './apps/terminal/shell';


export default function Home() {
  const terminalStartupCommands = [
    { command: "whois", args: [] },
    { command: "contact", args: [] },
    { command: "experience", args: ["-s"] },
    { command: "help", args: [] },
  ];

  const aboutMeNotes = `# About Me

I'm a 23 year old Software Engineer, currently working at State Farm.

# Goals

Having just graduated college and starting work with State Farm, my primary goal is to learn as much as I can to become the best engineer I can.
`;

  const aboutPageNotes = `# Why is this page like this?

I don't love Web dev, but I do love solving interesting problems. 

Creating a desktop environment with a functional terminal, an app I live in, felt interesting enough to make.

The windows are fully functional, and the terminal has a "shell" behind it. Try entering a command found in \`help\`.

For now, I've entirely ignored mobile, because I've yet to decide how that would work with this idea.
`

  return (
    <main className="w-screen h-screen overflow-hidden">
      <BackgroundImage />
      <WindowManager>
        <Window
          title="Notes"
          dimensions={{ width: "25%", height: "55%", defaultMax: false }}
          position={{ top: "8%", left: "3%" }}
          index={4}
        >
          <Notes markdown={aboutPageNotes} />
        </Window>
        <Window
          title="Terminal"
          dimensions={{ width: "48%", height: "70%", defaultMax: false }}
          position={{ top: "11%", left: "30%" }}
          index={2}
        >
          <Terminal shell={PortfolioShell} startupCommands={terminalStartupCommands} />
        </Window>
        <Window
          title="Notes"
          dimensions={{ width: "25%", height: "40%", defaultMax: false }}
          position={{ top: "60%", left: "70%" }}
          index={1}
        >
          <Notes markdown={aboutMeNotes} />
        </Window>
        <Window
          title="Image"
          dimensions={{ width: "200px", height: "200px", defaultMax: false }}
          position={{ top: "9%", left: "80%" }}
          index={0}
        >
          <Image imageSrc="/static/images/headshot.jpeg" />
        </Window>
      </WindowManager>
    </main>
  );
}
