"use client";
import { Card } from "@/components/ui/card";
import { ReactNode, useRef, useEffect } from "react";

type Props = {
  children: ReactNode;
}

export function Window({ children }: Props) {
  const windowRef = useRef<HTMLDivElement>(null);

  let movingWindow = false;
  let movingDisabled = false;
  let windowWidth = 0;
  let windowHeight = 0;
  let screenWidth = 0;
  let screenHeight = 0;
  let mouseOffsetY = 0;
  let mouseOffsetX = 0;
  let maximized = false;
  // let resizingWindow = false;

  let clicks = 0;
  const clickTimeout = 250;

  function incrementClicks() {
    clicks += 1;
    setTimeout(() => {
      clicks -= 1;
      if (clicks < 0) {
        clicks = 0;
      }
    }, clickTimeout)
  }

  // TODO: make resizable and moveable
  function enableMoving(e: React.MouseEvent) {
    if (typeof window === undefined) {
      return;
    }

    if (!windowRef?.current) {
      return;
    }

    incrementClicks();

    if (clicks >= 2) {
      toggleWindowSize();
    }

    movingWindow = true;
    const boundingRect = windowRef.current.getBoundingClientRect();
    windowWidth = boundingRect.width;
    windowHeight = boundingRect.height;
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    const currTop = windowRef.current.offsetTop;
    const currLeft = windowRef.current.offsetLeft;

    mouseOffsetY = e.clientY - currTop;
    mouseOffsetX = e.clientX - currLeft;
  }

  function moveWindow(e: MouseEvent) {
    if (!windowRef?.current) {
      return;
    }
    if (!movingWindow || movingDisabled) {
      return;
    }
    e.preventDefault();

    const currTop = windowRef.current.offsetTop;
    const currLeft = windowRef.current.offsetLeft;

    const clientX = e.clientX;
    const clientY = e.clientY;

    let newTop = clientY - mouseOffsetY;
    let newLeft = clientX - mouseOffsetX;

    if (newTop < 0) {
      newTop = 0;
      mouseOffsetY = e.clientY - currTop;
    }
    if (newTop > screenHeight - windowHeight) {
      newTop = screenHeight - windowHeight;
      mouseOffsetY = e.clientY - currTop;
    }
    if (newLeft < 0) {
      newLeft = 0;
      mouseOffsetX = e.clientX - currLeft;
    }
    if (newLeft > screenWidth - windowWidth) {
      newLeft = screenWidth - windowWidth;
      mouseOffsetX = e.clientX - currLeft;
    }

    windowRef.current.style.top = newTop + "px";
    windowRef.current.style.left = newLeft + "px";
  }

  function disableMoving() {
    movingWindow = false;
  }

  function toggleWindowSize() {
    if (!windowRef?.current) {
      return;
    }

    windowRef.current.style.transition = "all 250ms ease";
    movingDisabled = true;
    clicks = 0;
    setTimeout(() => {
      if (!windowRef?.current) {
        return;
      }
      windowRef.current.style.transition = "";
      movingDisabled = false;
    }, 250);
    if (maximized) {
      minimizeWindow();
    } else {
      maximizeWindow();
    }
    maximized = !maximized;
  }

  function minimizeWindow() {
    if (!windowRef?.current) {
      return;
    }
    windowRef.current.style.width = "1024px";
    windowRef.current.style.height = "600px";
    windowRef.current.style.top = "25%";
    windowRef.current.style.left = "25%";
  }

  function maximizeWindow() {
    if (!windowRef?.current) {
      return;
    }
    windowRef.current.style.width = "100%";
    windowRef.current.style.height = "100%";
    windowRef.current.style.top = "0";
    windowRef.current.style.left = "0";
  }

  // function enableResize(e) {
  //   resizingWindow = true;
  //
  //   const boundingRect = windowRef.current.getBoundingClientRect();
  //   windowHeight = boundingRect.height;
  //   screenHeight = window.innerHeight;
  //
  //   const currTop = windowRef.current.offsetTop;
  //
  //   mouseOffsetY = e.clientY - currTop;
  // }
  // function disableResize(e) {
  //   resizingWindow = false;
  // }
  //
  // function resizeDown(e) {
  //   if (!resizingWindow) {
  //     return;
  //   }
  //
  //   e.preventDefault();
  //   const currTop = windowRef.current.offsetTop;
  //
  //   let movementY = e.movementY;
  //
  //   const newWindowHeight = windowHeight + movementY;
  //   console.log("newWindowheight:", newWindowHeight);
  //   if (currTop + newWindowHeight > screenHeight - newWindowHeight) {
  //     console.log("too tall")
  //     return;
  //   }
  //
  //   windowHeight = newWindowHeight;
  //
  //   windowRef.current.style.height = windowHeight + "px";
  // }
  //

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    window.addEventListener("mouseup", disableMoving);
    window.addEventListener("mouseleave", disableMoving);
    window.addEventListener("mousemove", moveWindow);
  }, []);

  return (
    <div ref={windowRef} className="absolute top-1/4 left-1/4 w-[1024px] h-[600px] flex flex-col">
      <div className="select-none w-full h-5 rounded-t-lg border-slate-600 bg-slate-600 py-auto flex ">
        <button className="w-3 h-3 rounded-full bg-red-700 my-auto mx-1"></button>
        <div className="w-3 h-3 rounded-full bg-yellow-700 my-auto mx-1"></div>
        <div className="w-3 h-3 rounded-full bg-green-700 my-auto mx-1" onClick={toggleWindowSize}></div>
        <div className="w-full h-full cursor-grab active:cursor-grabbing" onMouseDown={enableMoving}></div>
      </div>
      <Card className="w-full h-full bg-slate-900 rounded-t-none border-slate-600 shadow-slate-500 text-white bg-opacity-40 overflow-hidden">
        {children}
      </Card>
    </div>

  )
}

{/* <div className="select-none absolute mx-auto left-0 right-0 -top-[4px] w-5/6 h-[4px] bg-blue-400 cursor-s-resize"></div> */ }
{/* <div className="select-none absolute mx-auto left-0 right-0 top-[600px] w-5/6 h-[4px] bg-blue-400 cursor-n-resize" onMouseDown={enableResize}></div> */ }
