"use client";

import { BackgroundImage } from './components';
import { Terminal, Notes, Image } from './apps';
import { Window, WindowManager } from './gui';
import { PortfolioShell } from './apps/terminal/shell';


export default function Home() {
  const terminalStartupCommands = [
    { command: "whois", args: [] },
    { command: "contact", args: [] },
    { command: "experience", args: [] },
    { command: "help", args: [] },
  ];

  const aboutPageNotes = `# About This Page

I don't love Web dev, but I do love solving interesting problems. 

Creating a desktop environment with an interactive terminal, an app I live in, felt interesting enough to make.

The windows are fully functional, and the terminal has a "shell" behind it. Try entering a command found in \`help\`.

*For now, I've entirely ignored mobile, because I've yet to decide how that would work with this idea.*

# Links

- [LinkedIn](https://linkedin.com/in/jackitaliano)
- [GitHub](https://github.com/jackitaliano)
`

  return (
    <main className="w-[100dvw] h-[100dvh] overflow-hidden">
      <BackgroundImage />
      <WindowManager>
        <Window
          title="Notes"
          dimensions={{ width: "var(--wm-window-notes-w)", height: "var(--wm-window-notes-h)", defaultMax: false }}
          position={{ top: "6%", left: "1%" }}
          index={2}
        >
          <Notes markdown={aboutPageNotes} />
        </Window>
        <Window
          title="Terminal"
          dimensions={{ width: "var(--wm-window-terminal-w)", height: "var(--wm-window-terminal-h)", defaultMax: false }}
          position={{ top: "11%", left: "31%" }}
          index={1}
        >
          <Terminal shell={PortfolioShell} startupCommands={terminalStartupCommands} />
        </Window>
        <Window
          title="Image"
          dimensions={{ width: "var(--wm-window-image-size)", height: "var(--wm-window-image-size)", defaultMax: false }}
          position={{ top: "9%", left: "82%" }}
          index={0}
        >
          <Image imageSrc="/static/images/headshot.jpeg" />
        </Window>
      </WindowManager>
    </main>
  );
}
