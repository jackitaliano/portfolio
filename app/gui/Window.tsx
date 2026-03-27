"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode, useRef, useEffect } from "react";

type Dimensions = {
  width: string;
  height: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  defaultMax?: boolean;
}

type Position = {
  top: string;
  left: string;
}

type SetIndexCallBack = (index: number) => void;

type ActionCallback = (setZIndexCallback: SetIndexCallBack) => void;

export type WindowContext = {
  enterCallback: ActionCallback;
}

const defaultWindowContext: WindowContext = {
  enterCallback: () => { },
};

type Props = {
  title: string;
  dimensions: Dimensions;
  position: Position;
  index: number;
  state: WindowState;
  onStateChange: (updater: WindowState | ((prev: WindowState) => WindowState)) => void;
  onClose?: () => void;
  onMinimize?: (windowRect: DOMRect) => void;
  isVisible?: boolean;
  ctx?: WindowContext;
  onFocus?: () => void;
  requestFocusToken?: number;
  children: ReactNode;
}

type MouseEventCallback = (e: MouseEvent) => void;

export type WindowState = {
  width: string;
  height: string;
  top: string;
  left: string;
  zIndex: number;
  isMaximized: boolean;
}

export function Window({ title, dimensions, position, index, state, onStateChange, onClose, onMinimize, isVisible = true, ctx, onFocus, requestFocusToken, children }: Props) {
  const windowCtx: WindowContext = ctx ?? defaultWindowContext;
  const windowRef = useRef<HTMLDivElement>(null);
  const lastFocusTokenRef = useRef<number>(-1);
  const restoreStateRef = useRef<WindowState | null>(null);

  if (typeof dimensions?.defaultMax === "undefined") {
    dimensions.defaultMax = false;
  }

  const movingWindowRef = useRef(false);
  const movingDisabledRef = useRef(false);
  const windowWidthRef = useRef(0);
  const windowHeightRef = useRef(0);
  const screenWidthRef = useRef(0);
  const screenHeightRef = useRef(0);
  const mouseOffsetYRef = useRef(0);
  const mouseOffsetXRef = useRef(0);

  const style = {
    width: state.width,
    minWidth: dimensions.minWidth ?? "min(var(--wm-window-min-w), var(--wm-window-max-w))",
    maxWidth: state.isMaximized ? "none" : dimensions.maxWidth ?? "var(--wm-window-max-w)",
    height: state.height,
    minHeight: dimensions.minHeight ?? "min(var(--wm-window-min-h), var(--wm-window-max-h))",
    maxHeight: state.isMaximized ? "none" : dimensions.maxHeight ?? "var(--wm-window-max-h)",
    top: state.top,
    left: state.left,
    zIndex: state.zIndex ?? index,
  }

  // let resizingWindow = false;

  const clicksRef = useRef(0);
  const clickTimeout = 250;

  function incrementClicks() {
    clicksRef.current += 1;
    setTimeout(() => {
      clicksRef.current -= 1;
      if (clicksRef.current < 0) {
        clicksRef.current = 0;
      }
    }, clickTimeout)
  }

  // TODO: make resizable and moveable
  function enableMoving(e: MouseEvent) {
    if (typeof window === "undefined") {
      return;
    }

    if (!windowRef?.current) {
      return;
    }

    incrementClicks();

    if (clicksRef.current >= 2) {
      toggleWindowSize();
    }

    movingWindowRef.current = true;
    const boundingRect = windowRef.current.getBoundingClientRect();
    windowWidthRef.current = boundingRect.width;
    windowHeightRef.current = boundingRect.height;
    screenWidthRef.current = window.innerWidth;
    screenHeightRef.current = window.innerHeight;

    const currTop = windowRef.current.offsetTop;
    const currLeft = windowRef.current.offsetLeft;

    mouseOffsetYRef.current = e.clientY - currTop;
    mouseOffsetXRef.current = e.clientX - currLeft;
  }

  function moveWindow(e: MouseEvent) {
    if (!windowRef?.current) {
      return;
    }
    if (!movingWindowRef.current || movingDisabledRef.current) {
      return;
    }
    e.preventDefault();

    const currTop = windowRef.current.offsetTop;
    const currLeft = windowRef.current.offsetLeft;

    const clientX = e.clientX;
    const clientY = e.clientY;

    let newTop = clientY - mouseOffsetYRef.current;
    let newLeft = clientX - mouseOffsetXRef.current;

    if (newTop < 0) {
      newTop = 0;
      mouseOffsetYRef.current = e.clientY - currTop;
    }
    if (newTop > screenHeightRef.current - windowHeightRef.current) {
      newTop = screenHeightRef.current - windowHeightRef.current;
      mouseOffsetYRef.current = e.clientY - currTop;
    }
    if (newLeft < 0) {
      newLeft = 0;
      mouseOffsetXRef.current = e.clientX - currLeft;
    }
    if (newLeft > screenWidthRef.current - windowWidthRef.current) {
      newLeft = screenWidthRef.current - windowWidthRef.current;
      mouseOffsetXRef.current = e.clientX - currLeft;
    }

    onStateChange((prev) => ({
      ...prev,
      top: `${newTop}px`,
      left: `${newLeft}px`,
    }));
  }

  function disableMoving() {
    movingWindowRef.current = false;
  }

  function toggleWindowSize() {
    if (!windowRef?.current) {
      return;
    }

    windowRef.current.style.transition = "all 150ms ease";
    movingDisabledRef.current = true;
    clicksRef.current = 0;
    setTimeout(() => {
      if (!windowRef?.current) {
        return;
      }
      windowRef.current.style.transition = "";
      movingDisabledRef.current = false;
    }, 150);
    onStateChange((prev) => {
      if (prev.isMaximized) {
        const restoreState = restoreStateRef.current;
        if (!restoreState) {
          return {
            ...prev,
            width: dimensions.width,
            height: dimensions.height,
            top: position.top,
            left: position.left,
            isMaximized: false,
          };
        }

        restoreStateRef.current = null;
        return {
          ...prev,
          width: restoreState.width,
          height: restoreState.height,
          top: restoreState.top,
          left: restoreState.left,
          isMaximized: false,
        };
      }

      restoreStateRef.current = {
        ...prev,
        isMaximized: false,
      };

      return {
        ...prev,
        width: "100dvw",
        height: "100dvh",
        top: "0",
        left: "0",
        isMaximized: true,
      };
    });
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

  const prevTouchRef = useRef<Touch | null>(null);
  const touchingRef = useRef(false);
  const moveWindowHandlerRef = useRef<MouseEventCallback>(() => { });
  const disableMovingHandlerRef = useRef(() => { });
  const touchMoveHandlerRef = useRef<(e: TouchEvent) => void>(() => { });
  const touchEndHandlerRef = useRef(() => { });

  function onTouchStart(e: TouchEvent, callback: MouseEventCallback) {
    if (touchingRef.current) {
      return;
    }

    touchingRef.current = true;
    const firstTouch = e.touches[0];
    prevTouchRef.current = firstTouch;

    const clientX = firstTouch.clientX;
    const clientY = firstTouch.clientY;
    const movementX = 0;
    const movementY = 0;

    const mouseEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: clientX,
      clientY: clientY,
      movementX: movementX,
      movementY: movementY
    })

    callback(mouseEvent);
  }

  function onTouchMove(e: TouchEvent, callback: MouseEventCallback) {
    if (!prevTouchRef.current) {
      return;
    }

    const newTouch = e.touches[0];

    const clientX = newTouch.clientX;
    const clientY = newTouch.clientY;
    const movementX = newTouch.pageX - prevTouchRef.current.pageX;
    const movementY = newTouch.pageY - prevTouchRef.current.pageY;

    const mouseEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: clientX,
      clientY: clientY,
      movementX: movementX,
      movementY: movementY
    })

    callback(mouseEvent);

    prevTouchRef.current = newTouch;
  }

  function onTouchEnd(callback: MouseEventCallback) {
    const mouseEvent = new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    })
    callback(mouseEvent);
    touchingRef.current = false;
    prevTouchRef.current = null;
  }

  moveWindowHandlerRef.current = moveWindow;
  disableMovingHandlerRef.current = disableMoving;
  touchMoveHandlerRef.current = (e: TouchEvent) => onTouchMove(e, moveWindowHandlerRef.current);
  touchEndHandlerRef.current = () => onTouchEnd(disableMovingHandlerRef.current);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleMouseUp = () => disableMovingHandlerRef.current();
    const handleMouseLeave = () => disableMovingHandlerRef.current();
    const handleMouseMove = (e: MouseEvent) => moveWindowHandlerRef.current(e);
    const handleTouchEnd = () => touchEndHandlerRef.current();
    const handleTouchMove = (e: TouchEvent) => touchMoveHandlerRef.current(e);

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  function setZIndex(index: number) {
    onStateChange((prev) => ({ ...prev, zIndex: index }));
  }

  function handleWindowMouseDown() {
    windowCtx.enterCallback(setZIndex);
    onFocus?.();
  }

  function handleCloseClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onClose?.();
  }

  function handleMinimizeClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!windowRef.current) {
      return;
    }

    onMinimize?.(windowRef.current.getBoundingClientRect());
  }

  useEffect(() => {
    if (typeof requestFocusToken !== "number") {
      return;
    }

    if (requestFocusToken === lastFocusTokenRef.current) {
      return;
    }

    lastFocusTokenRef.current = requestFocusToken;
    windowCtx.enterCallback((nextIndex) => onStateChange((prev) => ({ ...prev, zIndex: nextIndex })));
    onFocus?.();
  }, [requestFocusToken, windowCtx, onFocus, onStateChange]);

  return (
      <div ref={windowRef}
      style={style}
      className={cn(
        "absolute flex flex-col border border-[#444547] rounded-lg overflow-hidden shadow-[var(--wm-window-shadow)] text-slate-200",
        !isVisible && "hidden"
      )}
      onMouseDown={handleWindowMouseDown}
    >
      <div className="select-none w-full h-[var(--wm-titlebar-h)] bg-[#353738] border-b border-[#444547] flex items-center">
        <button
          className="w-[var(--wm-traffic-size)] h-[var(--wm-traffic-size)] min-w-[var(--wm-traffic-size)] min-h-[var(--wm-traffic-size)] rounded-full shrink-0 bg-[#ff3c36] mx-[var(--wm-traffic-gap)]"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleCloseClick}
          aria-label={`Close ${title}`}
          title={`Close ${title}`}
        ></button>
        <button
          className="w-[var(--wm-traffic-size)] h-[var(--wm-traffic-size)] min-w-[var(--wm-traffic-size)] min-h-[var(--wm-traffic-size)] rounded-full shrink-0 bg-[#ffc500] mx-[var(--wm-traffic-gap)]"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleMinimizeClick}
          aria-label={`Minimize ${title}`}
          title={`Minimize ${title}`}
        ></button>
        <button className="w-[var(--wm-traffic-size)] h-[var(--wm-traffic-size)] min-w-[var(--wm-traffic-size)] min-h-[var(--wm-traffic-size)] rounded-full shrink-0 bg-[#00c41e] mx-[var(--wm-traffic-gap)]" onMouseUp={toggleWindowSize}></button>
        <div className="z-10 w-full h-full cursor-grab active:cursor-grabbing" onMouseDown={(e: React.MouseEvent) => enableMoving(e.nativeEvent)}
          onTouchStart={(e: React.TouchEvent) => onTouchStart(e.nativeEvent, enableMoving)}>
        </div>
        <p className="z-0 absolute inset-x-0 px-[var(--wm-title-pad-x)] text-center truncate whitespace-nowrap overflow-hidden pointer-events-none">{title}</p>
      </div>
      <Card className="w-full h-full bg-slate-900 rounded-none border-0 shadow-none text-slate-200 bg-opacity-40 overflow-hidden">
        {children}
      </Card>
    </div>

  )
}

{/* <div className="select-none absolute mx-auto left-0 right-0 -top-[4px] w-5/6 h-[4px] bg-blue-400 cursor-s-resize"></div> */ }
{/* <div className="select-none absolute mx-auto left-0 right-0 top-[600px] w-5/6 h-[4px] bg-blue-400 cursor-n-resize" onMouseDown={enableResize}></div> */ }
