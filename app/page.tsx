import { Info, Experience } from './pages';
import { Page, FadeIn, BackgroundImage, MoreButton } from './components';
import { Terminal } from './components/Terminal';
import './css/animations.css';

export default function Home() {
  return (
    <div className="flex justify-center">
      <BackgroundImage />
      <div className="flex w-screen max-w-[1000px] h-screen px-8">
        <main className="flex flex-col justify-center w-full">
          <Terminal />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </div>
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
