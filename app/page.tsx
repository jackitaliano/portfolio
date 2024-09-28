import { BackgroundImage } from './components';
import { Terminal } from './components/Terminal';
import './css/animations.css';
import { Window } from './components/Window';

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <BackgroundImage />
      <Window>
        <Terminal />
      </Window>
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
