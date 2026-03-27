"use client";

import { ReactNode, useRef, useState } from 'react';
import { BackgroundImage } from './components';
import { Terminal, Notes, Image } from './apps';
import { AppDrawer, Window, WindowManager } from './gui';
import { PortfolioShell } from './apps/terminal/shell';
import type { WindowState } from './gui/Window';

type AppWindow = {
  id: string;
  title: string;
  dimensions: {
    width: string;
    height: string;
    defaultMax: boolean;
  };
  position: {
    top: string;
    left: string;
  };
  index: number;
  content: ReactNode;
};

type BoxRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type MinimizeAnimation = {
  appId: string;
  from: BoxRect;
  to: BoxRect;
  active: boolean;
};

type WindowLifecycleState = 'open' | 'minimized' | 'closed';

const MINIMIZE_ANIMATION_MS = 260;

function buildInitialWindowState(appWindow: AppWindow): WindowState {
  return {
    width: appWindow.dimensions.width,
    height: appWindow.dimensions.height,
    top: appWindow.position.top,
    left: appWindow.position.left,
    zIndex: appWindow.index,
    isMaximized: appWindow.dimensions.defaultMax,
  };
}

export default function Home() {
  const [focusedAppId, setFocusedAppId] = useState('notes');
  const [focusToken, setFocusToken] = useState(0);
  const [requestedFocusId, setRequestedFocusId] = useState<string | null>(null);

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

  const appWindows: AppWindow[] = [
    {
      id: 'notes',
      title: 'Notes',
      dimensions: { width: 'var(--wm-window-notes-w)', height: 'var(--wm-window-notes-h)', defaultMax: false },
      position: { top: '6%', left: '1%' },
      index: 2,
      content: <Notes markdown={aboutPageNotes} />,
    },
    {
      id: 'terminal',
      title: 'Terminal',
      dimensions: { width: 'var(--wm-window-terminal-w)', height: 'var(--wm-window-terminal-h)', defaultMax: false },
      position: { top: '11%', left: '31%' },
      index: 1,
      content: <Terminal shell={PortfolioShell} startupCommands={terminalStartupCommands} />,
    },
    {
      id: 'image',
      title: 'Image',
      dimensions: { width: 'var(--wm-window-image-size)', height: 'var(--wm-window-image-size)', defaultMax: false },
      position: { top: '9%', left: '82%' },
      index: 0,
      content: <Image imageSrc="/static/images/headshot.jpeg" alt="Headshot of Jack Italiano" />,
    },
  ];

  const [windowStates, setWindowStates] = useState<Record<string, WindowState>>(() =>
    Object.fromEntries(appWindows.map((appWindow) => [appWindow.id, buildInitialWindowState(appWindow)]))
  );
  const [windowLifecycleState, setWindowLifecycleState] = useState<Record<string, WindowLifecycleState>>(() =>
    Object.fromEntries(appWindows.map((appWindow) => [appWindow.id, 'open']))
  );
  const [minimizeAnimation, setMinimizeAnimation] = useState<MinimizeAnimation | null>(null);
  const dockIconRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const minimizeTimeoutRef = useRef<number | null>(null);

  function updateWindowState(appWindow: AppWindow, updater: WindowState | ((prev: WindowState) => WindowState)) {
    setWindowStates((prevStates) => {
      const currentState = prevStates[appWindow.id] ?? buildInitialWindowState(appWindow);
      const nextState = typeof updater === 'function' ? updater(currentState) : updater;

      return {
        ...prevStates,
        [appWindow.id]: nextState,
      };
    });
  }

  function focusApp(appId: string) {
    setFocusedAppId(appId);
    setRequestedFocusId(appId);
    setFocusToken((currentToken) => currentToken + 1);
  }

  function toBoxRect(rect: DOMRect): BoxRect {
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }

  function setDockIconRef(appId: string, element: HTMLButtonElement | null) {
    dockIconRefs.current[appId] = element;
  }

  function closeApp(appId: string) {
    setWindowLifecycleState((prev) => ({
      ...prev,
      [appId]: 'closed',
    }));
  }

  function openOrFocusApp(appWindow: AppWindow) {
    const lifecycleState = windowLifecycleState[appWindow.id] ?? 'open';

    if (lifecycleState === 'closed') {
      setWindowStates((prev) => ({
        ...prev,
        [appWindow.id]: buildInitialWindowState(appWindow),
      }));
    }

    if (lifecycleState !== 'open') {
      setWindowLifecycleState((prev) => ({
        ...prev,
        [appWindow.id]: 'open',
      }));
    }

    focusApp(appWindow.id);
  }

  function minimizeApp(appWindow: AppWindow, windowRect: DOMRect) {
    setWindowLifecycleState((prev) => ({
      ...prev,
      [appWindow.id]: 'minimized',
    }));

    const targetElement = dockIconRefs.current[appWindow.id];
    if (!targetElement) {
      return;
    }

    const targetRect = targetElement.getBoundingClientRect();
    const from = toBoxRect(windowRect);
    const to = toBoxRect(targetRect);

    setMinimizeAnimation({ appId: appWindow.id, from, to, active: false });

    requestAnimationFrame(() => {
      setMinimizeAnimation((prev) => {
        if (!prev || prev.appId !== appWindow.id) {
          return prev;
        }

        return { ...prev, active: true };
      });
    });

    if (minimizeTimeoutRef.current !== null) {
      window.clearTimeout(minimizeTimeoutRef.current);
    }

    minimizeTimeoutRef.current = window.setTimeout(() => {
      setMinimizeAnimation((prev) => (prev?.appId === appWindow.id ? null : prev));
      minimizeTimeoutRef.current = null;
    }, MINIMIZE_ANIMATION_MS + 30);
  }

  return (
    <main className="w-[100dvw] h-[100dvh] overflow-hidden">
      <BackgroundImage />
      <WindowManager>
        {appWindows.map((appWindow) => {
          const lifecycleState = windowLifecycleState[appWindow.id] ?? 'open';
          if (lifecycleState === 'closed') {
            return null;
          }

          const windowState = windowStates[appWindow.id] ?? buildInitialWindowState(appWindow);

          return (
            <Window
              key={appWindow.id}
              title={appWindow.title}
              dimensions={appWindow.dimensions}
              position={appWindow.position}
              index={windowState.zIndex}
              state={windowState}
              onStateChange={(updater) => updateWindowState(appWindow, updater)}
              onClose={() => closeApp(appWindow.id)}
              onMinimize={(windowRect) => minimizeApp(appWindow, windowRect)}
              isVisible={lifecycleState === 'open'}
              onFocus={() => setFocusedAppId(appWindow.id)}
              requestFocusToken={requestedFocusId === appWindow.id ? focusToken : undefined}
            >
              {appWindow.content}
            </Window>
          );
        })}
      </WindowManager>
      <AppDrawer
        apps={appWindows.map((appWindow) => ({
          id: appWindow.id,
          title: appWindow.title,
          isActive: (windowLifecycleState[appWindow.id] ?? 'open') === 'open' && focusedAppId === appWindow.id,
          onClick: () => openOrFocusApp(appWindow),
          buttonRef: (element) => setDockIconRef(appWindow.id, element),
          icon: (
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/20 bg-zinc-800/60 text-sm font-semibold text-slate-100">
              {appWindow.title.charAt(0)}
            </span>
          ),
        }))}
      />
      {minimizeAnimation ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[9998] rounded-lg border border-white/25 bg-slate-900/45 backdrop-blur-[2px]"
          style={{
            top: `${(minimizeAnimation.active ? minimizeAnimation.to : minimizeAnimation.from).top}px`,
            left: `${(minimizeAnimation.active ? minimizeAnimation.to : minimizeAnimation.from).left}px`,
            width: `${(minimizeAnimation.active ? minimizeAnimation.to : minimizeAnimation.from).width}px`,
            height: `${(minimizeAnimation.active ? minimizeAnimation.to : minimizeAnimation.from).height}px`,
            transition: `all ${MINIMIZE_ANIMATION_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
            boxShadow: '0 10px 24px rgba(0, 0, 0, 0.35)',
          }}
        />
      ) : null}
    </main>
  );
}
