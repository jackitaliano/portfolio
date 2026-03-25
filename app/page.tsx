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

  const aboutMeNotes = `# Who am I?

I'm a 21 year old college student with a passion for technology.

# Goals?

As I enter the workforce, my main hope is to have an impact. I want to contribute to a project that affects someone's daily life, as that is what will motivate me to do my best.

# Hobbies?

- Golfer, Snowboarder/Skier, Runner
- Fraternity Risk Manager, Website Coordinator, Professional Development Lead
- Lacrosse player, Football player, and Cross Country runner
- Lifelong Learner and Problem Solver
`;

  const aboutPageNotes = `# Why is this page like this?

I don't love UI dev, but I do love solving interesting problems. Creating a desktop environment with a functional terminal, an app I live in, felt interesting enough to make.`

  return (
    <main className="w-screen h-screen overflow-hidden">
      <BackgroundImage />
      <WindowManager>
        <Window
          title="Notes"
          dimensions={{ width: "25%", height: "25%", defaultMax: false }}
          position={{ top: "60%", left: "60%" }}
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
          dimensions={{ width: "25%", height: "55%", defaultMax: false }}
          position={{ top: "8%", left: "3%" }}
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
