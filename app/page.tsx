"use client";

import { BackgroundImage } from './components';
import { Image as ProfileImage } from './components/Image';
import { Notes } from './components/Notes';
import { Terminal } from './components/Terminal';
import { Window } from './components/Window';
import { WindowManager } from './components/WindowManager';
import { PortfolioShell } from './shell/portfolioShell';


export default function Home() {
  const terminalStartupCommands = [
    { command: "whois", args: [] },
    { command: "contact", args: [] },
    { command: "experience", args: ["-s"] },
    { command: "projects", args: [] },
    { command: "help", args: [] },
  ];

  return (
    <main className="w-screen h-screen overflow-hidden">
      <BackgroundImage />
      <WindowManager>
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
          dimensions={{ width: "25%", height: "55%", defaultMax: false }}
          position={{ top: "8%", left: "3%" }}
          index={1}
        >
          <Notes />
        </Window>
        <Window
          title="Image"
          dimensions={{ width: "200px", height: "200px", defaultMax: false }}
          position={{ top: "9%", left: "80%" }}
          index={0}
        >
          <ProfileImage imageSrc="/static/images/headshot.jpeg" />
        </Window>
      </WindowManager>
    </main>
  );
}

{/* <Page id="info"> */ }
{/*   <FadeIn> */ }
{/*     <div className="w-full h-full flex flex-col"> */ }
{/*       <Info /> */ }
{/*       <div className="mt-auto flex justify-center animated fade-in delay-5"> */ }
{/*         <MoreButton scrollId="experience" /> */ }
{/*       </div> */ }
{/*     </div> */ }
{/*   </FadeIn> */ }
{/* </Page> */ }
{/* <Page id="experience"> */ }
{/*   <FadeIn> */ }
{/*     <div className="w-full h-full flex flex-col"> */ }
{/*       <Experience /> */ }
{/*       <div className="mt-auto flex justify-center"> */ }
{/*         <MoreButton scrollId="projects" /> */ }
{/*       </div> */ }
{/*     </div> */ }
{/*   </FadeIn> */ }
{/* </Page> */ }
{/* <Page id="projects"> */ }
{/*   <FadeIn> */ }
{/*     <div className="w-full h-full flex flex-col"> */ }
{/*       <h1>Projects</h1> */ }
{/*     </div> */ }
{/*   </FadeIn> */ }
{/* </Page> */ }
