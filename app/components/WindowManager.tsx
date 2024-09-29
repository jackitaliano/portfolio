"use client";
import { Notes } from './Notes';
import { Terminal } from './Terminal';
import { Image } from './Image';
import { Window, WindowContext } from './Window';

export function WindowManager() {
  let top = 2;

  const term = {
    title: "Terminal",
    dimensions: {
      width: "48%",
      height: "65%",
      defaultMax: false,
    },
    position: {
      top: "20%",
      left: "30%",
    },
    index: top,
  };

  const notes = {
    title: "Notes",
    dimensions: {
      width: "25%",
      height: "55%",
      defaultMax: false,
    },
    position: {
      top: "15%",
      left: "3%",
    },
    index: 1,
  };

  const headShot = {
    title: "Image",
    dimensions: {
      width: "200px",
      height: "200px",
      defaultMax: false,
    },
    position: {
      top: "22%",
      left: "80%",
    },
    index: 0,
  };


  const windowCtx: WindowContext = {
    enterCallback: (setZIndexCallback) => {
      top += 1;
      setZIndexCallback(top);
    }
  }

  return (
    <div>
      <Window title={term.title} dimensions={term.dimensions} position={term.position} index={term.index} ctx={windowCtx}>
        <Terminal />
      </Window>
      <Window title={notes.title} dimensions={notes.dimensions} position={notes.position} index={notes.index} ctx={windowCtx}>
        <Notes />
      </Window>
      <Window title={headShot.title} dimensions={headShot.dimensions} position={headShot.position} index={headShot.index} ctx={windowCtx}>
        <Image imageSrc="/static/images/headshot.jpeg" />
      </Window>
    </div>
  )

}
